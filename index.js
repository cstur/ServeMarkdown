import app from './src/app.js';

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 6003;
app.listen(port);