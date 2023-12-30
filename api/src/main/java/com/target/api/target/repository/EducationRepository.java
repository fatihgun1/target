package com.target.api.target.repository;

import com.target.api.target.model.EducationModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository extends JpaRepository<EducationModel,Long> {
    EducationModel findByCode(String code);
    List<EducationModel> findByOwner(String owner);
}
