import { Exception } from './exception';

export class WarningException extends Exception {
	public exceptionType = 'warning';

	getCmd(): string {
		return 'warning.create';
	}
}