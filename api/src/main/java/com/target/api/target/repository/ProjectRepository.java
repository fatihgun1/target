package com.target.api.target.repository;

import com.target.api.target.model.ProjectModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectModel,Long> {
    List<ProjectModel> findByOwner(String owner);
    ProjectModel findByCode(String code);

}
