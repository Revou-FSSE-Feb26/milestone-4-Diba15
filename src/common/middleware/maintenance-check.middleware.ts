import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MaintenanceCheckMiddleware implements NestMiddleware {
  private readonly env: string;

  constructor() {
    this.env = process.env.ENVIRONTMENT || 'production'; // Default ke 'production' jika tidak ada env
  }

  use(request: Request, response: Response, next: NextFunction): void {
    if (this.env === 'maintenance') {
      response.status(503).json({
        statusCode: 503,
        message: 'Service is under maintenance. Please try again later.',
      });
      return;
    }

    next();
  }
}
