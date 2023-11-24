package com.smartbear.backend.repository;

import com.smartbear.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


// TODO: write correct query to get today task insted of pulling it out in service
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
}
