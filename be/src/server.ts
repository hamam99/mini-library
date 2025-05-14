import app from './app';
import config from './config/config';
// import db from './db';

import http from 'http';
import db from './db';

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.on('open', () => {
    console.log('Connected to MongoDB');
});
