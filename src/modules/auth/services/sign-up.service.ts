import { BadRequestError } from '../../../errors';
import { AppDataSource } from '../../../data-source';
import User from '../entities/user.entity';
import { Encryption } from '../helpers/encryption';

type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

export class SignUpService {
  async execute(input: SignUpInput) {
    const repository = AppDataSource.getRepository(User);

    if (await repository.findOne({ where: { email: input.email } })) {
      throw new BadRequestError('User already exists');
    }

    const user = repository.create({
      ...input,
      password: await Encryption.encryptPassword(input.password),
    });

    await repository.save(user);

    return {
      user,
      token: Encryption.generateToken(user.id),
    };
  }
}
