# Healthcare Backend

REST API for managing patients, doctors and patient-doctor mappings.
Built with Node.js, Express, PostgreSQL (Sequelize) and JWT authentication.

## Setup

1. Install dependencies

   npm install

2. Create a PostgreSQL database

   CREATE DATABASE healthcare;

3. Copy `.env.example` to `.env` and fill in your values

4. Start the server

   npm run dev

Tables are created automatically on first start.

## Endpoints

Auth
- POST /api/auth/register
- POST /api/auth/login

Patients (token required)
- POST /api/patients
- GET /api/patients
- GET /api/patients/:id
- PUT /api/patients/:id
- DELETE /api/patients/:id

Doctors (token required)
- POST /api/doctors
- GET /api/doctors
- GET /api/doctors/:id
- PUT /api/doctors/:id
- DELETE /api/doctors/:id

Mappings (token required)
- POST /api/mappings
- GET /api/mappings
- GET /api/mappings/:patientId
- DELETE /api/mappings/:id

Send the token as `Authorization: Bearer <token>`.

## Sample bodies

Register: { "name": "John", "email": "john@example.com", "password": "secret123" }

Patient: { "name": "Asha", "age": 30, "gender": "female", "phone": "9999999999", "address": "Meerut" }

Doctor: { "name": "Dr. Rao", "specialization": "Cardiology", "email": "rao@example.com", "phone": "8888888888" }

Mapping: { "patientId": 1, "doctorId": 1 }
