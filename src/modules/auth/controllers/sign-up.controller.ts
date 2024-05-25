import { Request, Response } from 'express';
import { SignUpService } from '../services/sign-up.service';
import { Controller } from 'src/protocols/controller';

export class SignUpController implements Controller {
  constructor(private readonly signUpService: SignUpService) {}

  async handle(req: Request, res: Response) {
    for (const field of ['name', 'email', 'password']) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Field "${field}" is required` });
      }
    }

    const { name, email, password } = req.body;

    const signUpResponse = await this.signUpService.execute({ name, email, password });

    return res.status(200).json(signUpResponse);
  }
}
