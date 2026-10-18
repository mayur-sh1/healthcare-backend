# Healthcare Backend

REST API for managing patients, doctors and patient-doctor mappings.
Built with Node.js, Express, PostgreSQL (Sequelize) and JWT authentication.

## Setup

1. Install dependencies

```bash
npm install
```

2. Create a PostgreSQL database

```sql
CREATE DATABASE healthcare;
```

3. Copy `.env.example` to `.env` and fill in your values

4. Start the server

```bash
npm run dev
```

Tables are created automatically on first start.

## API Endpoints

Send the token as `Authorization: Bearer <token>` on all routes except auth.

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a user |
| POST | /api/auth/login | Login and get a JWT |

### Patients
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/patients | Add a patient |
| GET | /api/patients | Get your patients |
| GET | /api/patients/:id | Get one patient |
| PUT | /api/patients/:id | Update a patient |
| DELETE | /api/patients/:id | Delete a patient |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/doctors | Add a doctor |
| GET | /api/doctors | Get all doctors |
| GET | /api/doctors/:id | Get one doctor |
| PUT | /api/doctors/:id | Update a doctor |
| DELETE | /api/doctors/:id | Delete a doctor |

### Mappings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/mappings | Assign a doctor to a patient |
| GET | /api/mappings | Get all mappings |
| GET | /api/mappings/:patientId | Get doctors of a patient |
| DELETE | /api/mappings/:id | Remove a doctor from a patient |

## Sample Request Bodies

Register
```json
{ "name": "John", "email": "john@example.com", "password": "secret123" }
```

Patient
```json
{ "name": "Asha", "age": 30, "gender": "female", "phone": "9999999999", "address": "Meerut" }
```

Doctor
```json
{ "name": "Dr. Rao", "specialization": "Cardiology" }
```

Mapping
```json
{ "patientId": 1, "doctorId": 1 }
```