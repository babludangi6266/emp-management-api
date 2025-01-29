# Employee Management System

This project is a Node.js-based Employee Management System that supports the following features:

- CRUD operations for managing employees.
- AES encryption for securely storing phone numbers.
- Pagination for listing employees.
- Department-based employee statistics.

---

## Setup Instructions

Follow these steps to set up and run the project:

### 1. **Clone the Repository**

```bash
git clone https://github.com/babludangi6266/emp-management-api.git
cd employee-management-system
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Environment Variables**

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PHONE_SECRET=your_secret_key_for_encryption
```

### 4. **Start the Server**

```bash
npm start
```

The server will run at `http://localhost:5000`.

---

## API Documentation

### 1. **Get All Employees**

- **Endpoint:** `GET /api/employees?page={page}&limit={limit}`
- **Description:** Retrieves paginated employees with decrypted phone numbers.

**Response Example:**

```json
{
  "totalRecords": 50,
  "totalPages": 5,
  "employees": [
            {
            "id": 2,
            "department_id": 2,
            "name": "John Smith",
            "dob": "1990-01-01",
            "phone": "9876543210",
            "photo": "new_url_to_photo",
            "email": "john.smith@example.com",
            "salary": 60000,
            "status": true,
            "created": "2025-01-29T03:49:43.000Z",
            "modified": "2025-01-29T03:49:43.000Z",
            "Department": {
                "name": "Finance"
            },
  ]
}
```

### 2. **Add a New Employee**

- **Endpoint:** `POST /api/employees`
- **Payload Example:**

```json
{
  "department_id": 1,
  "name": "John Doe",
  "dob": "1990-01-01",
  "phone": "1234567890",
  "photo": "profile.jpg",
  "email": "john.doe@example.com",
  "salary": 60000,
  "status": true
}
```

- **Response Example:**

```json
{
  "message": "Employee added successfully",
  "employee": {
    "id": 1,
    "name": "John Doe",
    "phone": "1234567890"
  }
}
```

### 3. **Update Employee**

- **Endpoint:** `PUT /api/employees/:id`

### 4. **Delete Employee**

- **Endpoint:** `DELETE /api/employees/:id`

### 5. **Get Employee Statistics**

- **Endpoint:** `GET /api/employees/statistics`

---

## Testing APIs in Postman

### 1. **Set Up a New Collection**

- Create a new Postman collection named "Employee Management".
- Add the following requests to the collection:
  - `GET /api/employees`
  - `POST /api/employees`
  - `PUT /api/employees/:id`
  - `DELETE /api/employees/:id`
  - `GET /api/employees/statistics`

### 2. **Environment Variables**

Set base URL as an environment variable:

- `{{baseUrl}} = http://localhost:5000`

### 3. **Testing Get All Employees**

- Use the endpoint `GET {{baseUrl}}/api/employees?page=1&limit=10`.

### 4. **Testing Add Employee**

- Use the `POST {{baseUrl}}/api/employees` endpoint with the payload example provided above.

---

## Department Data Creation

### Option 1: Manual SQL Insert

Run the following SQL script to populate the `departments` table:

```sql
INSERT INTO departments (name) VALUES
('Human Resources'),
('Finance'),
('IT'),
('Sales'),
('Marketing');
```

### Option 2: Use Seeders

Run the following command to seed the department data:

```bash
npx sequelize db:seed:all
```

---

## Project Features

1. **Employee Management**

   - Add, update, delete, and list employees with paginated results.

2. **Phone Encryption**

   - Securely store phone numbers using AES encryption.

3. **Department Management**

   - Link employees to departments for structured data.

4. **Statistics API**

   - Retrieve department-wise employee statistics, including:
     - Salary distribution.
     - Youngest employee in each department.

---
