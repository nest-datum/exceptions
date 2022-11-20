import { Exception } from './exception';

export class NotFoundException extends Exception {
	public exceptionType = 'notFound';
	public httpCode = 404;

	getCmd(): string {
		return 'warning.create';
	}
}