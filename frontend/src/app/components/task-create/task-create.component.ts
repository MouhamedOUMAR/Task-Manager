import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container-fluid">
      <!-- Header Section -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="glass-card p-4">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="text-white mb-2">
                  <i class="fas fa-plus me-3"></i>Create New Task
                </h2>
                <p class="text-white-50 mb-0">Add a new task to your productivity journey</p>
              </div>
              <a routerLink="/tasks" class="btn btn-outline-primary">
                <i class="fas fa-arrow-left me-2"></i>Back to Tasks
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="row justify-content-center">
        <div class="col-lg-8 col-xl-6">
          <div class="task-form">
            <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
              <!-- Title Field -->
              <div class="mb-4">
                <label for="title" class="form-label">
                  <i class="fas fa-heading me-2"></i>Task Title *
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  formControlName="title"
                  [class.is-invalid]="taskForm.get('title')?.invalid && taskForm.get('title')?.touched"
                  placeholder="Enter a descriptive title for your task"
                >
                <div *ngIf="taskForm.get('title')?.invalid && taskForm.get('title')?.touched" class="invalid-feedback">
                  <div *ngIf="taskForm.get('title')?.errors?.['required']">
                    <i class="fas fa-exclamation-circle me-1"></i>Task title is required.
                  </div>
                </div>
              </div>

              <!-- Description Field -->
              <div class="mb-4">
                <label for="description" class="form-label">
                  <i class="fas fa-align-left me-2"></i>Description
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  formControlName="description"
                  rows="4"
                  placeholder="Provide additional details about your task (optional)"
                ></textarea>
                <small class="text-white-50">
                  <i class="fas fa-info-circle me-1"></i>Adding a description helps you remember the details later.
                </small>
              </div>

              <!-- Status Field -->
              <div class="mb-4">
                <label for="status" class="form-label">
                  <i class="fas fa-flag me-2"></i>Status *
                </label>
                <select
                  class="form-select"
                  id="status"
                  formControlName="status"
                  [class.is-invalid]="taskForm.get('status')?.invalid && taskForm.get('status')?.touched"
                >
                  <option value="">Choose a status</option>
                  <option [value]="TaskStatus.TODO">
                    <i class="fas fa-clock me-2"></i>{{ TaskStatus.TODO }}
                  </option>
                  <option [value]="TaskStatus.IN_PROGRESS">
                    <i class="fas fa-spinner me-2"></i>{{ TaskStatus.IN_PROGRESS }}
                  </option>
                  <option [value]="TaskStatus.DONE">
                    <i class="fas fa-check me-2"></i>{{ TaskStatus.DONE }}
                  </option>
                </select>
                <div *ngIf="taskForm.get('status')?.invalid && taskForm.get('status')?.touched" class="invalid-feedback">
                  <div *ngIf="taskForm.get('status')?.errors?.['required']">
                    <i class="fas fa-exclamation-circle me-1"></i>Please select a status.
                  </div>
                </div>
              </div>

              <!-- Due Date Field -->
              <div class="mb-4">
                <label for="dueDate" class="form-label">
                  <i class="fas fa-calendar me-2"></i>Due Date
                </label>
                <input
                  type="datetime-local"
                  class="form-control"
                  id="dueDate"
                  formControlName="dueDate"
                  placeholder="Set a deadline for your task (optional)"
                >
                <small class="text-white-50">
                  <i class="fas fa-info-circle me-1"></i>Setting a due date helps you prioritize and stay on track.
                </small>
              </div>

              <!-- Error Alert -->
              <div *ngIf="error" class="alert alert-danger mb-4" role="alert">
                <div class="d-flex align-items-center">
                  <i class="fas fa-exclamation-triangle me-3 fs-4"></i>
                  <div>
                    <h6 class="alert-heading">Oops! Something went wrong</h6>
                    <p class="mb-0">{{ error }}</p>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="d-flex justify-content-between align-items-center">
                <a routerLink="/tasks" class="btn btn-outline-secondary btn-lg">
                  <i class="fas fa-times me-2"></i>Cancel
                </a>
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  [disabled]="taskForm.invalid || loading"
                >
                  <span *ngIf="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  <i *ngIf="!loading" class="fas fa-save me-2"></i>
                  {{ loading ? 'Creating...' : 'Create Task' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  loading = false;
  error = '';
  TaskStatus = TaskStatus;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      status: ['', [Validators.required]],
      dueDate: ['']
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.loading = true;
      this.error = '';

      const taskData: Task = {
        ...this.taskForm.value,
        dueDate: this.taskForm.value.dueDate ? new Date(this.taskForm.value.dueDate) : undefined
      };

      this.taskService.createTask(taskData).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.error = 'Failed to create task. Please try again.';
          this.loading = false;
          console.error('Error creating task:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.taskForm.controls).forEach(key => {
      const control = this.taskForm.get(key);
      control?.markAsTouched();
    });
  }
} 