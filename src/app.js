const express = require('express');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/mappings', require('./routes/mappingRoutes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
