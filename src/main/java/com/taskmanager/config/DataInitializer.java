package com.taskmanager.config;

import com.taskmanager.entity.Task;
import com.taskmanager.enums.TaskStatus;
import com.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if no tasks exist
        if (taskRepository.count() == 0) {
            initializeSampleData();
        }
    }

    private void initializeSampleData() {
        Task task1 = new Task();
        task1.setTitle("Complete Project Documentation");
        task1.setDescription("Write comprehensive documentation for the new feature implementation");
        task1.setStatus(TaskStatus.IN_PROGRESS);
        task1.setDueDate(LocalDateTime.now().plusDays(3));

        Task task2 = new Task();
        task2.setTitle("Review Code Changes");
        task2.setDescription("Review pull requests and provide feedback to team members");
        task2.setStatus(TaskStatus.TODO);
        task2.setDueDate(LocalDateTime.now().plusDays(1));

        Task task3 = new Task();
        task3.setTitle("Deploy to Production");
        task3.setDescription("Deploy the latest version to production environment");
        task3.setStatus(TaskStatus.DONE);
        task3.setDueDate(LocalDateTime.now().minusDays(1));

        Task task4 = new Task();
        task4.setTitle("Update Dependencies");
        task4.setDescription("Update all project dependencies to their latest stable versions");
        task4.setStatus(TaskStatus.TODO);
        task4.setDueDate(LocalDateTime.now().plusDays(7));

        taskRepository.save(task1);
        taskRepository.save(task2);
        taskRepository.save(task3);
        taskRepository.save(task4);
    }
} 