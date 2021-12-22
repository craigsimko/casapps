import { Logger, LogLevel } from 'channelape-logger';

export default class Foo {
  private i: number;
  private logger: Logger;

  constructor() {
    this.logger = new Logger('Foo', LogLevel.VERBOSE);
    this.i = 0;
  }

  public static sum(x: number, y: number): number {
    return x + y;
  }

  public difference(x: number, y: number): number {
    this.logger.info(`Returning the difference between ${x} and ${y}`);
    return x - y;
  }
}
