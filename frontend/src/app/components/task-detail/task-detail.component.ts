import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container-fluid">
      <!-- Header Section -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="glass-card p-4">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="text-white mb-2">
                  <i class="fas fa-eye me-3"></i>Task Details
                </h2>
                <p class="text-white-50 mb-0">View and manage your task information</p>
              </div>
              <div class="d-flex gap-2">
                <a [routerLink]="['/tasks', task?.id, 'edit']" class="btn btn-warning">
                  <i class="fas fa-edit me-2"></i>Edit Task
                </a>
                <a routerLink="/tasks" class="btn btn-outline-primary">
                  <i class="fas fa-arrow-left me-2"></i>Back to Tasks
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-spinner">
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-white mt-3">Loading task details...</p>
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
            <button (click)="loadTask()" class="btn btn-outline-danger">
              <i class="fas fa-redo me-2"></i>Try Again
            </button>
          </div>
        </div>
      </div>

      <!-- Task Details -->
      <div *ngIf="!loading && !error && task" class="row justify-content-center">
        <div class="col-lg-8">
          <div class="task-details">
            <!-- Task Header -->
            <div class="text-center mb-5">
              <h1 class="display-5 fw-bold text-white mb-3">{{ task.title }}</h1>
              <span class="status-badge" [ngClass]="getStatusClass(task.status)">
                {{ task.status }}
              </span>
            </div>

            <!-- Task Description -->
            <div *ngIf="task.description" class="mb-5">
              <h5 class="text-white mb-3">
                <i class="fas fa-align-left me-2"></i>Description
              </h5>
              <div class="glass-card p-4">
                <p class="text-white-50 mb-0">{{ task.description }}</p>
              </div>
            </div>

            <!-- Task Information Grid -->
            <div class="row mb-5">
              <div class="col-md-6 mb-4">
                <div class="glass-card p-4 h-100">
                  <h5 class="text-white mb-3">
                    <i class="fas fa-calendar me-2"></i>Due Date
                  </h5>
                  <p *ngIf="task.dueDate" class="text-white-50 mb-0">
                    {{ task.dueDate | date:'fullDate' }}
                  </p>
                  <p *ngIf="!task.dueDate" class="text-white-50 mb-0">
                    <em>No due date set</em>
                  </p>
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="glass-card p-4 h-100">
                  <h5 class="text-white mb-3">
                    <i class="fas fa-clock me-2"></i>Created
                  </h5>
                  <p class="text-white-50 mb-0">
                    {{ task.createdAt | date:'medium' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Last Updated -->
            <div *ngIf="task.updatedAt && task.updatedAt !== task.createdAt" class="mb-5">
              <div class="glass-card p-4">
                <h5 class="text-white mb-3">
                  <i class="fas fa-edit me-2"></i>Last Updated
                </h5>
                <p class="text-white-50 mb-0">
                  {{ task.updatedAt | date:'medium' }}
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex justify-content-between align-items-center">
              <button (click)="deleteTask()" class="btn btn-danger btn-lg">
                <i class="fas fa-trash me-2"></i>Delete Task
              </button>
              <div class="d-flex gap-3">
                <a [routerLink]="['/tasks', task.id, 'edit']" class="btn btn-warning btn-lg">
                  <i class="fas fa-edit me-2"></i>Edit Task
                </a>
                <a routerLink="/tasks" class="btn btn-primary btn-lg">
                  <i class="fas fa-list me-2"></i>All Tasks
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  loading = false;
  error = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(): void {
    this.loading = true;
    this.error = '';

    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.taskService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.task = task;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load task. Please try again.';
        this.loading = false;
        console.error('Error loading task:', error);
      }
    });
  }

  deleteTask(): void {
    if (this.task && confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      this.taskService.deleteTask(this.task.id!).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
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
} 