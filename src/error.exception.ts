import { Exception } from './exception';

export class ErrorException extends Exception {
	public exceptionType = 'error';
}