import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // 'HTTP' adalah context/label log-nya
  private logPath = path.join(process.cwd(), 'logs', 'request.log');

  constructor() {
    const logDir = path.dirname(this.logPath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

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

      fs.appendFileSync(this.logPath, `${message}\n`);
    });

    next(); // Dipanggil agar dilanjutkan ke controller/middleware selanjutnya
  }
}
