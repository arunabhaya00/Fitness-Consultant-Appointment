const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const fitnessConsultantRoutes = require('./routes/fitnessConsultantRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

connectDB();

app.use(morgan(':method :status :url "HTTP/:http-version"'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/fitness-consultant', require('./routes/fitnessConsultantRoutes'));

mongoose
   .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('\n\nDatabase connected\n\n');
      app.listen(port, () => {
         console.log(`\n\nServer is running on port ${port}\n\n`);
      });
   })
   .catch((error) => console.error(error));
