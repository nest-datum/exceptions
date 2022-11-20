import { Exception } from './exception';

export class TrafficException extends Exception {
	public exceptionType = 'traffic';
	public httpCode = 200;

	getCmd(): string {
		return 'traffic.create';
	}

	getHost() {
		if (!this.payload
			|| typeof this.payload !== 'object'
			|| Array.isArray(this.payload)
			|| !this.payload['host']
			|| typeof this.payload['host'] !== 'string') {
			return this.addMessage(`"host" in "payload" property is not a string.`);
		}
		return this.payload['host'];
	}

	getReferrer() {
		if (!this.payload
			|| typeof this.payload !== 'object'
			|| Array.isArray(this.payload)
			|| !this.payload['referrer']
			|| typeof this.payload['referrer'] !== 'string') {
			return this.addMessage(`"referrer" in "payload" property is not a string.`);
		}
		return this.payload['referrer'];
	}

	getOriginalUrl() {
		if (!this.payload
			|| typeof this.payload !== 'object'
			|| Array.isArray(this.payload)
			|| !this.payload['originalUrl']
			|| typeof this.payload['originalUrl'] !== 'string') {
			return this.addMessage(`"originalUrl" in "payload" property is not a string.`);
		}
		return this.payload['originalUrl'];
	}

	getMethod() {
		if (!this.payload
			|| typeof this.payload !== 'object'
			|| Array.isArray(this.payload)
			|| !this.payload['method']
			|| typeof this.payload['method'] !== 'string') {
			return this.addMessage(`"method" in "payload" property is not a string.`);
		}
		return this.payload['method'];
	}

	getHeaders() {
		if (!this.payload
			|| typeof this.payload !== 'object'
			|| Array.isArray(this.payload)
			|| !this.payload['headers']
			|| typeof this.payload['headers'] !== 'object'
			|| Array.isArray(this.payload['headers'])) {
			return this.addMessage(`"headers" in "payload" property is not an object.`);
		}
		return this.payload['headers'];
	}

	getIP() {
		if (!this.payload
			|| typeof this.payload !== 'object'
			|| Array.isArray(this.payload)
			|| !this.payload['ip']
			|| typeof this.payload['ip'] !== 'string') {
			return this.addMessage(`"ip" in "payload" property is not a IP.`);
		}
		const ipSplit = this.payload['ip'].split(':');
		const ipClear = ipSplit[ipSplit.length - 1].trim();

		return ipClear;
	}

	getQueries() {
		if (this.payload
			&& typeof this.payload === 'object'
			&& !Array.isArray(this.payload)
			&& this.payload['queries']
			&& typeof this.payload['queries'] === 'object'
			&& !Array.isArray(this.payload['queries'])) {
			return this.payload['queries'];
		}
		return {};
	}

	getParam() {
		if (this.payload
			&& typeof this.payload === 'object'
			&& !Array.isArray(this.payload)
			&& this.payload['param']
			&& typeof this.payload['param'] === 'object'
			&& !Array.isArray(this.payload['param'])) {
			return this.payload['param'];
		}
		return {};
	}

	getBody() {
		if (this.payload
			&& typeof this.payload === 'object'
			&& !Array.isArray(this.payload)
			&& this.payload['body']
			&& typeof this.payload['body'] === 'object') {
			return this.payload['body'];
		}
		return {};
	}

	getCookies() {
		if (this.payload
			&& typeof this.payload === 'object'
			&& !Array.isArray(this.payload)
			&& this.payload['cookies']
			&& typeof this.payload['cookies'] === 'object') {
			return this.payload['cookies'];
		}
		return {};
	}

	logOptionsPayload() {
		return {
			host: this.getHost(),
			referrer: this.getReferrer(),
			originalUrl: this.getOriginalUrl(),
			method: this.getMethod(),
			headers: this.getHeaders(),
			ipAddr: this.getIP(),
			queries: this.getQueries(),
			content: this.getMessage(),
			param: this.getParam(),
			body: this.getBody(),
			cookies: this.getCookies(),
			route: this.getOriginalUrl(),
		};
	}
}