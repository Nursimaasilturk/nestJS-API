import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { timeStamp } from "console";

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter{
	catch(exception: HttpException, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse();
		const request = host.switchToHttp().getRequest();
		const status = exception.getStatus();
		// errorResponse exception içindeki hata bilgisini taşır.
		const errorReponse = exception.getResponse() as {
			message:string;
			errorCode?:string;

		};

		response.status(status).json({
			success:false,
			statusCode:status,
			message:errorReponse.message,
			errorCode:errorReponse.errorCode || null,
			timestamp: new Date().toISOString(),
			path:request.url
		})
	}
}