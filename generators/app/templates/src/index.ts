import { Logger, LogLevel } from 'channelape-logger';
import Foo from './Foo';

export * from './Foo';

const logger = new Logger('index', LogLevel.VERBOSE);

logger.info('HELLO!');

Foo.sum(3, 5);
