# Task Manager Frontend

Angular 17 frontend application for the Task Manager.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm start
   ```

   The application will start on `http://localhost:4200`

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📋 Features

- **Responsive Design** - Works on desktop and mobile
- **Modern UI** - Bootstrap 5 with Font Awesome icons
- **Form Validation** - Real-time validation with error messages
- **Loading States** - Spinners during API calls
- **Error Handling** - User-friendly error messages
- **Navigation** - Angular Router with navigation
- **Status Badges** - Color-coded task status indicators

## 📁 Project Structure

```
src/app/
├── app.component.ts              # Main app component
├── app.config.ts                 # App configuration
├── app.routes.ts                 # Routing configuration
├── components/
│   ├── task-list/                # Task list component
│   ├── task-create/              # Create task component
│   ├── task-edit/                # Edit task component
│   └── task-detail/              # Task detail component
├── services/
│   └── task.service.ts           # API service
└── models/
    └── task.model.ts             # Task interface
```

## 🎨 Pages

### Home Page (`/tasks`)
- Displays all tasks in card layout
- Each card shows title, description, status, and due date
- Action buttons for view, edit, and delete
- Create new task button
- Empty state when no tasks exist

### Create Task (`/tasks/create`)
- Reactive form for creating new tasks
- Form validation with error messages
- Required fields: title and status
- Optional fields: description and due date
- Cancel and submit buttons

### Edit Task (`/tasks/:id/edit`)
- Pre-populated form with existing task data
- Same validation as create form
- Updates existing task on submit
- Navigation to task detail after save

### Task Detail (`/tasks/:id`)
- Detailed view of a single task
- Shows all task information
- Action buttons for edit and delete
- Navigation back to task list

## 🔧 Configuration

### API Configuration
The frontend connects to the Spring Boot backend at `http://localhost:8080/api`.

### Styling
- **Bootstrap 5** - Main CSS framework
- **Font Awesome** - Icons
- **Custom CSS** - Additional styling in `styles.css`

### Environment
- **Development**: `http://localhost:4200`
- **API Base URL**: `http://localhost:8080/api`
- **CORS**: Configured for backend integration

## 🛠️ Development

### Available Commands

```bash
# Development server
npm start

# Build for production
npm run build

# Watch mode
npm run watch

# Run tests
npm test
```

### Code Structure

#### Components
All components are standalone and use:
- **Reactive Forms** for form handling
- **Angular Router** for navigation
- **Bootstrap** for styling
- **Font Awesome** for icons

#### Services
- **TaskService** - Handles all API communication
- **HTTP Client** - For REST API calls
- **Error Handling** - Consistent error management

#### Models
- **Task Interface** - TypeScript interface for task data
- **TaskStatus Enum** - Enum for task status values

## 🎯 Key Features

### Form Validation
- Required field validation
- Real-time error messages
- Form state management
- Submit button disabled when invalid

### Loading States
- Spinner during API calls
- Loading text on buttons
- Disabled forms during submission

### Error Handling
- User-friendly error messages
- Alert components for errors
- Console logging for debugging

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Responsive cards and forms
- Touch-friendly buttons

## 🔍 API Integration

### TaskService Methods
```typescript
getAllTasks(): Observable<Task[]>
getTaskById(id: number): Observable<Task>
createTask(task: Task): Observable<Task>
updateTask(id: number, task: Task): Observable<Task>
deleteTask(id: number): Observable<void>
```

### Error Handling
- HTTP error responses
- Network connectivity issues
- Validation errors
- User confirmation for destructive actions

## 🎨 UI Components

### Status Badges
- **TODO**: Yellow badge
- **IN_PROGRESS**: Blue badge
- **DONE**: Green badge

### Cards
- Hover effects
- Action buttons
- Truncated descriptions
- Date formatting

### Forms
- Bootstrap form styling
- Validation feedback
- Loading states
- Responsive layout

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure backend is running on port 8080
   - Check CORS configuration
   - Verify API endpoints

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check Angular version compatibility
   - Verify TypeScript configuration

3. **Styling Issues**
   - Ensure Bootstrap is properly imported
   - Check Font Awesome CDN
   - Verify custom CSS imports

4. **Routing Issues**
   - Check route configuration
   - Verify component imports
   - Ensure proper navigation

## 📚 Dependencies

- **Angular 17** - Main framework
- **Bootstrap 5** - UI framework
- **Font Awesome** - Icons
- **RxJS** - Reactive programming
- **TypeScript** - Language

## 🔧 Development Tips

### Adding New Features
1. Create new component in `components/` folder
2. Add route in `app.routes.ts`
3. Update navigation in `app.component.ts`
4. Add service methods if needed
5. Update models if required

### Styling Guidelines
- Use Bootstrap classes when possible
- Add custom CSS in `styles.css`
- Follow mobile-first approach
- Use consistent spacing and colors

### Code Organization
- Keep components focused and small
- Use services for API calls
- Implement proper error handling
- Follow Angular best practices

## 📄 License

This project is part of the Task Manager application. 