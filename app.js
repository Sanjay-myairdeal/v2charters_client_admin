const express = require('express');

const app = express();
const dbConnect = require('./server/models/dbConnect');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
                        
dotenv.config();

// Static Files
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
const adminRoutes = require('./server/adminRoutes/adminRoutes');
app.use('/api/admin', adminRoutes);

// Database Connection
dbConnect();

// Server
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
