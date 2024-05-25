import { BadRequestError } from '../../../errors';
import { AppDataSource } from '../../../data-source';
import User from '../entities/user.entity';
import { Encryption } from '../helpers/encryption';

type SignInInput = {
  email: string;
  password: string;
};

export class SignInService {
  async execute(input: SignInInput) {
    const repository = AppDataSource.getRepository(User);

    const user = await repository.findOne({ where: { email: input.email } });

    if (!user || (await Encryption.comparePassword(input.password, user.password))) {
      throw new BadRequestError('Invalid email or password');
    }

    return {
      user,
      token: Encryption.generateToken(user.id),
    };
  }
}
