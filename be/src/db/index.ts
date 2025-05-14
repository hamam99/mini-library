import mongoose from 'mongoose';
import config from '../config/config';

mongoose.connect(config.urlMongoDb);
const db = mongoose.connection;

export default db;
