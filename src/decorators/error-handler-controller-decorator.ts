import { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import { Controller } from 'src/protocols/controller';

export class ErrorHandlerControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(request: Request, response: Response): Promise<any> {
    try {
      return await this.controller.handle(request, response);
    } catch (error) {
      console.error(error);

      if (error instanceof BadRequestError) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}
