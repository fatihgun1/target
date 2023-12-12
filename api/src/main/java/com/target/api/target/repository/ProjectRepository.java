package com.target.api.target.repository;

import com.target.api.target.model.ProjectModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectModel,Long> {
    List<ProjectModel> findByOwner(String owner);
    ProjectModel findByCode(String code);
    @Query(value = "SELECT p.code FROM project as p",nativeQuery = true)
    List<String> collectProjectCode();
}
