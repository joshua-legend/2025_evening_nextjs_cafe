import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((body) => ({
        statusCode: response.statusCode,
        success: response.statusCode >= 200 && response.statusCode < 300,
        message: body.message,
        data: body.data,
        path: request.url,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
