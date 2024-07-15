import app from './app';
import Logger from './Services/logger';
import { PORT } from './Utils/config';

const logger = new Logger('server');

app.listen(PORT, async () => {
  logger.log(`Server running on ${PORT}`, {});
});
