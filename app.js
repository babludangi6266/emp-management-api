
const express = require('express');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
