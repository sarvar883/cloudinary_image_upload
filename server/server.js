const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const fileupload = require('express-fileupload');

// import routes
const orderRoutes = require('./routes/order');

// import error handler functions
const errorFunctions = require('./middleware/error');

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use(cors());

// uploading files
app.use(fileupload());

// use routes
app.use('/order', orderRoutes);


// error handling
app.use(errorFunctions.notFound);
app.use(errorFunctions.errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));