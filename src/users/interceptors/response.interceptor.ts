import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const { method, url, body, headers } = req;

    const className = context.getClass().name;
    const timestamp = new Date().toISOString();

    return next.handle().pipe(
      map(data => ({
        data: data,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data.message,
        url: url,
        timestamp: timestamp,

      })),


      catchError(error => {
        this.logger.error(`Error occurred: ${error.message}`);
        return throwError(error);
      }),
    );
  }
}











//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest();
//     const requestHeaders = request.headers ? JSON.stringify(request.headers) : '';
//     const requestQueryParams = request.query ? JSON.stringify(request.query) : '';

//     return next.handle().pipe(
//       map((data) => {
//         const response = {
//           statusCode: context.switchToHttp().getResponse().statusCode,
//           data,
//           headers: requestHeaders,
//           queryParams: requestQueryParams,
//         };

//         this.logger.log(`Response: ${JSON.stringify(response)}`);
//         return response;
//       }),
//     );
//   }
// }
