import mongoose from 'mongoose';
import Logger from './logger';
import { LOCAL_DB, MONGODB_URL } from '../Utils/config';

const logger = new Logger('mongodb');

export const connectDB = async () => {
  try {
    const url = LOCAL_DB || MONGODB_URL;
      if (!url) {
        throw new Error('Database connection URL is not defined');
      }
    await mongoose.connect(url, {});

    logger.log('Mogodb connected successfully', {});
  } catch (error) {
    logger.error('Connection error:', { error });
  }
};

export default mongoose;
