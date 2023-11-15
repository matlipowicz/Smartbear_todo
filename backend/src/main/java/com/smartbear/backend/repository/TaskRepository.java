package com.smartbear.backend.repository;

import com.smartbear.backend.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class TaskRepository {
        @Autowired
        JdbcTemplate jdbcTemplate;

        public List<Task> getAllTodos(){
                String sqlQuery = "SELECT * FROM todos";
                return jdbcTemplate.query(sqlQuery, BeanPropertyRowMapper.newInstance(Task.class));
        }

}
