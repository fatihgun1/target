package com.target.api.target.repository;

import com.target.api.target.model.SubjectModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<SubjectModel,Long> {
    SubjectModel findByCode(String code);
    List<SubjectModel> findByEducation(String education);
}
