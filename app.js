const express = require('express');
const app = express();
const dbConnect = require('./server/models/dbConnect');
const port = 8000;
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // Swagger documentation
dotenv.config();

// Static Files
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(cors());
// Allow access from all origins
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Components
let components = ['NavHeroBar', 'ShowEstimates', 'OurServices', 'AboutFlight', 'LearnMore', 'OurFleets', 'PushSearchRes', 'Testimonials'];

app.get('/api/components', (req, res) => {
  res.json(components);
}); 

app.post('/api/components', (req, res) => {
  components = req.body;
  res.json({ message: 'Components updated successfully' });
});

// Routes
const bookingRoutes = require('./server/adminRoutes/bookingRoutes');
const categoryRoutes = require('./server/adminRoutes/categoryRoutes');
const loginRoutes = require('./server/adminRoutes/loginRoutes');
const logsRoutes = require('./server/adminRoutes/logsRoutes');
const onDemandRoutes = require('./server/adminRoutes/onDemanRoute'); // Corrected here
const subCategoryRoutes = require('./server/adminRoutes/subCategoryRoutes');
const enquiryRoutes = require('./server/adminRoutes/enquiryRoutes');
const filterRoutes = require('./server/adminRoutes/filterRoutes');
const typeRoutes = require('./server/adminRoutes/typeRoutes');
const userRole=require('./server/adminRoutes/userRoleRoutes');
const viewRoutes=require('./server/adminRoutes/viewRoutes')
const adminLogsRoutes=require('./server/adminRoutes/adminLogRoutes')

app.use('/api/v2/admin/types', typeRoutes);
app.use('/api/v2/admin/filter', filterRoutes);
app.use('/api/v2/admin/bookings', bookingRoutes);
app.use('/api/v2/admin/categories', categoryRoutes);
app.use('/api/v2/admin/auth', loginRoutes);
app.use('/api/v2/admin/logs', logsRoutes);
app.use('/api/v2/admin/demand', onDemandRoutes);
app.use('/api/v2/admin/subcategories', subCategoryRoutes);
app.use('/api/v2/admin/enquiry', enquiryRoutes);
app.use('/api/v2/admin/userroles',userRole);
app.use('/api/v2/admin/view',viewRoutes);
app.use('/api/v2/admin/adminlogs',adminLogsRoutes)

// Swagger Documentation
app.use('/api/v2/admin/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Database Connection
dbConnect();

// Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
