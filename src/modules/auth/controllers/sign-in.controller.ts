import { Request, Response } from 'express';
import { Controller } from '../../../protocols/controller';
import { SignInService } from '../services/sign-in.service';

export class SignInController implements Controller {
  constructor(private readonly signInService: SignInService) {}

  async handle(req: Request, res: Response) {
    for (const field of ['email', 'password']) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Field "${field}" is required` });
      }
    }

    const { email, password } = req.body;

    const signInResponse = await this.signInService.execute({ email, password });

    return res.status(200).json(signInResponse);
  }
}
