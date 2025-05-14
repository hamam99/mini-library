import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  urlMongoDb: string;
  nodeEnv?: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  urlMongoDb: process.env.URL_MONGODB_DEV || '',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;
