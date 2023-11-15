package com.smartbear.backend.repository;

import com.smartbear.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository2 extends JpaRepository<Task,Long> {

}
