# 🚀 Uptime Monitoring API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

A robust RESTful API service that enables authenticated users to monitor URLs and receive comprehensive uptime reports including availability metrics, response times, and uptime/downtime statistics.

## ✨ Features

- **User Authentication**: Secure JWT-based authentication system
- **URL Monitoring**: Track the status of multiple endpoints simultaneously
- **Detailed Reports**: Get insights on:
  - Availability percentage
  - Average response time
  - Total uptime/downtime
  - Historical performance data
- **API Documentation**: Complete Swagger documentation
- **Scalable Architecture**: Designed for horizontal scaling

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with JSONB support
- **ORM**: Knex.js with Objection.js
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger
- **Testing**: Jest
- **Monitoring Engine**: Custom-forked ping-monitor package
- **Containerization**: Docker

## 🚦 Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd uptime-monitoring
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations:
   ```bash
   npx knex migrate:latest
   ```

5. Start the server:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:<PORT>` (default: 3000)

## 📊 API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:<PORT>/api-docs
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🔍 Project Insights

### Key Implementations

- **Custom Fork**: Enhanced the ping-monitor package to meet project requirements
- **Cursor Pagination**: Implemented efficient data retrieval for large datasets
- **Event-Driven Architecture**: Leveraged Node.js events for asynchronous monitoring
- **JSONB Optimization**: Utilized PostgreSQL's JSONB capabilities for flexible data storage

### Learning Outcomes

- Deep dive into Node.js ecosystem and best practices
- Swagger API documentation implementation
- Advanced PostgreSQL features including JSONB types and indexing
- Package forking and contribution workflow
- Asynchronous programming patterns in Node.js
- Comparative analysis between Node.js and other backend technologies (PHP, Go)

## 🔮 Future Enhancements

- TypeScript migration for improved type safety
- Dependency injection pattern implementation
- Enhanced error handling with stack traces
- Comprehensive logging system
- Kubernetes deployment for auto-scaling
- Distributed monitoring architecture for large-scale operations
- Expanded test coverage with integration and load testing
- ACL implementation with objection-authorize
- Code refactoring for improved abstraction

## 🧰 Previous Node.js Experience

- Custom JWT implementation (2 years ago)
- Basic CRUD applications (3 years ago)
- Next.js and Vue.js tutorials (3 years ago)

---

*This project was developed as part of a backend assessment, demonstrating proficiency in building scalable monitoring solutions with Node.js.*
