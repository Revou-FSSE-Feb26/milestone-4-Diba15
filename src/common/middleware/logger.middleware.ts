// src/common/middleware/logger.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // 'HTTP' adalah context/label log-nya

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;
    const startTime = Date.now(); // Catat waktu mulai

    // Kita 'dengarkan' event 'finish' dari object response
    response.on('finish', () => {
      const { statusCode } = response;
      const responseTime = Date.now() - startTime; // Hitung selisih waktu

      // Format log sesuai requirement: method, path, status code, response time
      const message = `${method} ${originalUrl} ${statusCode} - ${responseTime}ms`;

      // Warnai log berdasarkan status code (opsional, tapi bagus)
      if (statusCode >= 500) {
        this.logger.error(message);
      } else if (statusCode >= 400) {
        this.logger.warn(message);
      } else {
        this.logger.log(message);
      }
    });

    next(); // Wajib dipanggil agar request lanjut ke Controller
  }
}
