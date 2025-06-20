# Task Manager Backend

Spring Boot REST API for the Task Manager application.

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### Setup

1. **Database Setup**
   ```sql
   CREATE DATABASE task_manager;
   ```

2. **Configuration**
   Update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run Application**
   ```bash
   mvn spring-boot:run
   ```

   The application will start on `http://localhost:8080`

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/{id}` | Get task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |

## 🔧 Features

- **RESTful API** with proper HTTP status codes
- **Global Exception Handling** with consistent error responses
- **Data Validation** using Bean Validation
- **CORS Configuration** for frontend integration
- **Swagger Documentation** at `/swagger-ui.html`
- **Sample Data** automatically loaded on startup

## 📁 Project Structure

```
src/main/java/com/taskmanager/
├── TaskManagerApplication.java    # Main application class
├── controller/
│   └── TaskController.java        # REST endpoints
├── service/
│   └── TaskService.java           # Business logic
├── repository/
│   └── TaskRepository.java        # Data access
├── entity/
│   └── Task.java                  # JPA entity
├── dto/
│   └── TaskDto.java               # Data transfer object
├── enums/
│   └── TaskStatus.java            # Task status enum
├── exception/
│   └── GlobalExceptionHandler.java # Error handling
└── config/
    └── DataInitializer.java       # Sample data loader
```

## 🗄️ Database Schema

The `Task` entity includes:
- `id` - Primary key
- `title` - Task title (required)
- `description` - Task description (optional)
- `status` - Task status (TODO, IN_PROGRESS, DONE)
- `dueDate` - Due date (optional)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## 🔍 API Examples

### Create Task
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "status": "TODO",
    "dueDate": "2024-01-15T10:00:00"
  }'
```

### Get All Tasks
```bash
curl http://localhost:8080/api/tasks
```

### Update Task
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "status": "IN_PROGRESS"
  }'
```

### Delete Task
```bash
curl -X DELETE http://localhost:8080/api/tasks/1
```

## 🛠️ Development

### Building
```bash
mvn clean compile
```

### Testing
```bash
mvn test
```

### Packaging
```bash
mvn clean package
```

### Running with JAR
```bash
java -jar target/task-manager-backend-0.0.1-SNAPSHOT.jar
```

## 🔧 Configuration

### Application Properties
- **Database**: MySQL with auto-creation
- **JPA**: Hibernate with SQL logging
- **Server**: Port 8080
- **CORS**: Enabled for localhost:4200
- **Swagger**: Available at `/swagger-ui.html`

### Environment Variables
You can override properties using environment variables:
```bash
export SPRING_DATASOURCE_USERNAME=myuser
export SPRING_DATASOURCE_PASSWORD=mypassword
export SERVER_PORT=8081
```

## 📊 Sample Data

The application automatically loads sample tasks on first startup:
1. Complete Project Documentation (IN_PROGRESS)
2. Review Code Changes (TODO)
3. Deploy to Production (DONE)
4. Update Dependencies (TODO)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**
   - Ensure MySQL is running
   - Check credentials in application.properties
   - Verify database exists

2. **Port Already in Use**
   - Change server.port in application.properties
   - Or use: `mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081`

3. **CORS Issues**
   - Backend CORS is configured for http://localhost:4200
   - Ensure frontend is running on correct port

## 📚 Dependencies

- **Spring Boot 3.2.0** - Main framework
- **Spring Data JPA** - Database operations
- **MySQL Connector** - Database driver
- **Lombok** - Reduces boilerplate
- **ModelMapper** - Object mapping
- **SpringDoc OpenAPI** - Swagger documentation

## 📄 License

This project is part of the Task Manager application. 