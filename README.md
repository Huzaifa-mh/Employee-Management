# 📊 Employee Management Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/.NET%20Core-5C2D91?style=for-the-badge&logo=.net&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
</p>

A professional Full-Stack management solution designed for modern HR workflows. This application provides a secure, role-based environment to manage organizational data with a focus on performance and data integrity.

[Explore API Docs](#) · [Report Bug](https://github.com/Huzaifa-mh/Backend/issues) · [Request Feature](https://github.com/Huzaifa-mh/Backend/issues)

---

### 🌟 Key Highlights

*   **Secure Authentication:** Multi-layered security using **JWT Bearer Tokens** and password hashing.
*   **Role-Based Access (RBAC):** Granular permissions for Admins (Full Control) and Employees (Read-Only/Limited).
*   **Optimized Data Mapping:** Clean database interactions using **Entity Framework Core** and the **DTO Pattern** to prevent data over-posting.
*   **Modern UI/UX:** A responsive dashboard built with **React** and **Tailwind CSS** featuring real-time data updates.

---

### 🛠️ Technical Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Axios, Lucide Icons |
| **Backend** | ASP.NET Core Web API, C# |
| **Database** | SQL Server (SSMS), EF Core |
| **Security** | JWT (JSON Web Tokens), CORS Policy |
| **Dev Tools** | Postman, Swagger UI, Git |

---



### 🚀 Getting Started

#### 1. Backend Setup (API)
```bash
# Clone the repository
git clone https://github.com/Huzaifa-mh/EMployee-Backend.git

# Navigate to project
cd Backend

# Update ConnectionString in appsettings.json
# Then run migrations
dotnet ef database update

# Run the API
dotnet run
2. Frontend Setup (UI)
code
Bash
# Navigate to frontend folder
cd client-app

# Install dependencies
npm install

# Start development server
npm start
```
🔒 Core Security Implementation
This project implements enterprise-standard security:
Authentication: AddJwtBearer middleware validates tokens on every request.
Authorization: Custom [Authorize(Roles = "Admin")] attributes protect sensitive endpoints.
Data Integrity: AutoMapper and DTOs ensure internal database models are never exposed directly to the client.
<p align="center">Built with ❤️ using the .NET Ecosystem</p>
```
