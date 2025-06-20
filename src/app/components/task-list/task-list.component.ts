import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container-fluid">
      <!-- Hero Section -->
      <div class="row mb-5">
        <div class="col-12 text-center">
          <div class="glass-card p-5">
            <h1 class="display-4 fw-bold text-white mb-3">
              <i class="fas fa-tasks me-3"></i>
              Task Manager
            </h1>
            <p class="lead text-white-50 mb-4">
              Organize your life, one task at a time
            </p>
            <div class="d-flex justify-content-center gap-3">
              <a routerLink="/tasks/create" class="btn btn-primary btn-lg">
                <i class="fas fa-plus me-2"></i>Create New Task
              </a>
              <button (click)="refreshTasks()" class="btn btn-outline-primary btn-lg">
                <i class="fas fa-sync-alt me-2"></i>Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="row mb-4" *ngIf="!loading && !error && tasks.length > 0">
        <div class="col-md-3 mb-3">
          <div class="glass-card p-3 text-center">
            <h3 class="text-white mb-1">{{ getTasksByStatus(TaskStatus.TODO).length }}</h3>
            <p class="text-white-50 mb-0">To Do</p>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="glass-card p-3 text-center">
            <h3 class="text-white mb-1">{{ getTasksByStatus(TaskStatus.IN_PROGRESS).length }}</h3>
            <p class="text-white-50 mb-0">In Progress</p>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="glass-card p-3 text-center">
            <h3 class="text-white mb-1">{{ getTasksByStatus(TaskStatus.DONE).length }}</h3>
            <p class="text-white-50 mb-0">Completed</p>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="glass-card p-3 text-center">
            <h3 class="text-white mb-1">{{ tasks.length }}</h3>
            <p class="text-white-50 mb-0">Total Tasks</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-spinner">
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-white mt-3">Loading your tasks...</p>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="row justify-content-center">
        <div class="col-md-8">
          <div class="alert alert-danger" role="alert">
            <div class="d-flex align-items-center">
              <i class="fas fa-exclamation-triangle me-3 fs-4"></i>
              <div>
                <h5 class="alert-heading">Oops! Something went wrong</h5>
                <p class="mb-0">{{ error }}</p>
              </div>
            </div>
            <hr>
            <button (click)="loadTasks()" class="btn btn-outline-danger">
              <i class="fas fa-redo me-2"></i>Try Again
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && !error && tasks.length === 0" class="empty-state">
        <div class="glass-card p-5">
          <i class="fas fa-clipboard-list"></i>
          <h4>No tasks found</h4>
          <p class="mb-4">Get started by creating your first task and begin your productivity journey!</p>
          <a routerLink="/tasks/create" class="btn btn-primary btn-lg">
            <i class="fas fa-plus me-2"></i>Create Your First Task
          </a>
        </div>
      </div>

      <!-- Tasks Grid -->
      <div *ngIf="!loading && !error && tasks.length > 0" class="row">
        <div *ngFor="let task of tasks; trackBy: trackByTaskId" class="col-lg-4 col-md-6 mb-4">
          <div class="task-card h-100">
            <div class="card-body">
              <!-- Task Header -->
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="card-title mb-0">{{ task.title }}</h5>
                <span class="status-badge" [ngClass]="getStatusClass(task.status)">
                  {{ task.status }}
                </span>
              </div>
              
              <!-- Task Description -->
              <p *ngIf="task.description" class="card-text text-muted mb-3">
                {{ task.description.length > 100 ? (task.description | slice:0:100) + '...' : task.description }}
              </p>
              
              <!-- Due Date -->
              <div *ngIf="task.dueDate" class="mb-3">
                <small class="text-muted">
                  <i class="fas fa-calendar me-2"></i>
                  Due: {{ task.dueDate | date:'mediumDate' }}
                </small>
              </div>
              
              <!-- Task Footer -->
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">
                  <i class="fas fa-clock me-1"></i>
                  {{ task.createdAt | date:'short' }}
                </small>
                <div class="btn-group" role="group">
                  <a [routerLink]="['/tasks', task.id]" class="btn btn-sm btn-outline-primary btn-action" 
                     title="View Details">
                    <i class="fas fa-eye"></i>
                  </a>
                  <a [routerLink]="['/tasks', task.id, 'edit']" class="btn btn-sm btn-outline-warning btn-action"
                     title="Edit Task">
                    <i class="fas fa-edit"></i>
                  </a>
                  <button (click)="deleteTask(task.id!)" class="btn btn-sm btn-outline-danger btn-action"
                          title="Delete Task">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <button routerLink="/tasks/create" class="fab" title="Create New Task">
      <i class="fas fa-plus"></i>
    </button>
  `,
  styles: []
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error = '';
  TaskStatus = TaskStatus;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';
    
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load tasks. Please try again.';
        this.loading = false;
        console.error('Error loading tasks:', error);
      }
    });
  }

  refreshTasks(): void {
    this.loadTasks();
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
          // Add success animation
          const deletedTask = document.querySelector(`[data-task-id="${id}"]`);
          if (deletedTask) {
            deletedTask.classList.add('success-animation');
          }
        },
        error: (error) => {
          this.error = 'Failed to delete task. Please try again.';
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.TODO:
        return 'status-todo';
      case TaskStatus.IN_PROGRESS:
        return 'status-in-progress';
      case TaskStatus.DONE:
        return 'status-done';
      default:
        return '';
    }
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id!;
  }
} 