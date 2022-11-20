import { Exception } from './exception';

export class NotificationException extends Exception {
	public exceptionType = 'notification';
	
	constructor(
		protected message: string,
		protected readonly options,
	) {
		super(message, {}, options);
	}

	getCmd(): string {
		return 'notification.create';
	}

	getAction() {
		return this.options['method'] || '';
	}

	logOptionsPayload() {
		return {
			userId: this.getUserId(),
			action: this.getAction(),
			content: this.getMessage(),
		};
	}
}