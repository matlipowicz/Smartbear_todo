package com.smartbear.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.*;
import java.util.Date;
import java.util.Objects;


@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String task_title;
    private String description;
    private long createdOn;
    private boolean done;
    private String priority;
    private LocalDateTime scheduledOn;
    private LocalTime time;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime finalDate;
    private String categoryClr;
    private String colorValue;


    public Task(String task_title, String description, long createdOn, boolean done, String priority, LocalDateTime scheduledOn, LocalTime time, LocalDateTime finalDate, String categoryClr, String colorValue) {
        this.task_title = task_title;
        this.description = description;
        this.createdOn = createdOn;
        this.done = done;
        this.priority = priority;
        this.scheduledOn = scheduledOn;
        this.time = time;
        this.finalDate = finalDate;
        this.categoryClr = categoryClr;
        this.colorValue = colorValue;
    }

    public boolean getDone(){
        return done;
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
