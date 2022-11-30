
export class Exception {
	protected cmd = '';
	public exceptionType = 'default';
	public httpCode = 500;

	constructor(
		protected message: string,
		protected readonly options,
		protected readonly payload: any,
	) {
		this.addCmd('err.create');
	}

	getCmd(): string {
		return this.cmd;
	}

	getMessage(): string {
		return this.message;
	}

	getReplica() {
		return `${process.env.TRANSPORT_HOST}:${process.env.TRANSPORT_PORT}`;
	}

	getUserId() {
		if (this.payload
			&& typeof this.payload === 'object'
			&& typeof this.payload['user'] === 'object'
			&& this.payload['user']['id']) {
			this.payload['userId'] = this.payload['user']['id'];

			return this.payload['user']['id'];
		}
		return this.addMessage(`"userId" in "payload" property is not an ID.`);
	}

	getMethod() {
		if (!this.options['method']
			|| typeof this.options['method'] !== 'string') {
			return this.addMessage(`"method" property is not a string.`);
		}
		return this.options['method'];
	}

	getLine() {
		if (!this.options['line']
			|| typeof this.options['line'] !== 'number'
			|| Number.isNaN(this.options['line'])) {
			return this.addMessage(`"line" property is not an number.`);
		}
		return this.options['line'];
	}

	getFile() {
		if (!this.options['file']
			|| typeof this.options['file'] !== 'string'
			|| Number.isNaN(this.options['file'])) {
			return this.addMessage(`"file" property is not a string.`);
		}
		return this.options['file'];
	}

	toLogOptionsData() {
		return {
			cmd: this.getCmd(),
			payload: {
				servId: process.env.APP_ID,
				replica: this.getReplica(),
				...this.logOptionsPayload(),
			},
		};
	}

	logOptionsPayload(): object {
		return {
			userId: this.getUserId(),
			method: this.getMethod(),
			content: this.getMessage(),
			file: this.getFile(),
			line: this.getLine(),
		};
	}

	protected addMessage(addedText: string) {
		return (this.message += ` ${addedText}`);
	}

	protected addCmd(newCmd: string) {
		return (this.cmd = newCmd);
	}
}
