package com.smartbear.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String task_title;
    private String description;
    private long createdOn;
    private boolean done;
    private String priority;
    private LocalDateTime scheduledOn;
    private LocalTime time;
    private LocalDateTime finalDate;
    @Embedded
    private CategoryLabel categoryLabel;


    public Task(String task_title, String description, long createdOn, boolean done, String priority, LocalDateTime scheduledOn, LocalTime time, LocalDateTime finalDate, CategoryLabel categoryLabel) {
        this.task_title = task_title;
        this.description = description;
        this.createdOn = createdOn;
        this.done = done;
        this.priority = priority;
        this.scheduledOn = scheduledOn;
        this.time = time;
        this.finalDate = finalDate;
        this.categoryLabel = categoryLabel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return id == task.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
