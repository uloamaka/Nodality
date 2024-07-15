import logfmt from 'logfmt';

class Logger {
  name: string;

  constructor(service: string) {
    this.name = service;
  }

  log(message: string, opts: object) {
    const logData = logfmt.stringify(
      Object.assign(opts, { component: this.name })
    );
    if (message) {
      process.stdout.write(`${message} ${logData}` + '\n');
    } else {
      process.stdout.write(`${logData}` + '\n');
    }
  }

  error(message: string, opts: object) {
    const logData = logfmt.stringify(
      Object.assign(opts, { component: this.name })
    );
    if (message) {
      process.stderr.write(`${message} ${logData}` + '\n');
    } else {
      process.stderr.write(`${logData}` + '\n');
    }
  }
}

export default Logger;
