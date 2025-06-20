import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
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
                  <i class="fas fa-edit me-3"></i>Edit Task
                </h2>
                <p class="text-white-50 mb-0">Refine the details of your task</p>
              </div>
              <a routerLink="/tasks" class="btn btn-outline-primary">
                <i class="fas fa-arrow-left me-2"></i>Back to Tasks
              </a>
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
          <p class="text-white mt-3">Loading task...</p>
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
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div *ngIf="!loading && taskForm" class="row justify-content-center">
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
                  placeholder="Enter a descriptive title"
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
                  placeholder="Provide additional details (optional)"
                ></textarea>
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
                  <option [value]="TaskStatus.TODO">{{ TaskStatus.TODO }}</option>
                  <option [value]="TaskStatus.IN_PROGRESS">{{ TaskStatus.IN_PROGRESS }}</option>
                  <option [value]="TaskStatus.DONE">{{ TaskStatus.DONE }}</option>
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
                >
              </div>

              <!-- Form Actions -->
              <div class="d-flex justify-content-between align-items-center">
                <a [routerLink]="['/tasks', taskId]" class="btn btn-outline-secondary btn-lg">
                  <i class="fas fa-times me-2"></i>Cancel
                </a>
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  [disabled]="taskForm.invalid || saving"
                >
                  <span *ngIf="saving" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  <i *ngIf="!saving" class="fas fa-save me-2"></i>
                  {{ saving ? 'Saving...' : 'Save Changes' }}
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
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup | null = null;
  loading = false;
  saving = false;
  error = '';
  taskId: number | null = null;
  TaskStatus = TaskStatus;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskId = +id;
      this.loadTask();
    } else {
      this.error = 'Task ID not found.';
    }
  }

  loadTask(): void {
    if (!this.taskId) return;
    this.loading = true;
    this.error = '';
    
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.initializeForm(task);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load task. Please try again.';
        this.loading = false;
        console.error('Error loading task:', error);
      }
    });
  }

  private initializeForm(task: Task): void {
    this.taskForm = this.fb.group({
      title: [task.title, [Validators.required]],
      description: [task.description || ''],
      status: [task.status, [Validators.required]],
      dueDate: [task.dueDate ? this.formatDateForInput(task.dueDate) : '']
    });
  }

  private formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return '';
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  onSubmit(): void {
    if (this.taskForm && this.taskForm.valid && this.taskId) {
      this.saving = true;
      this.error = '';

      const taskData: Task = {
        ...this.taskForm.value,
        dueDate: this.taskForm.value.dueDate ? new Date(this.taskForm.value.dueDate) : undefined
      };

      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () => {
          this.router.navigate(['/tasks', this.taskId]);
        },
        error: (error) => {
          this.error = 'Failed to update task. Please try again.';
          this.saving = false;
          console.error('Error updating task:', error);
        }
      });
    } else if (this.taskForm) {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    if (this.taskForm) {
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm!.get(key);
        control?.markAsTouched();
      });
    }
  }
} 