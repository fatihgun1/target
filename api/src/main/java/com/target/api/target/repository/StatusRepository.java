package com.target.api.target.repository;

import com.target.api.target.model.StatusModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<StatusModel,Long> {
    StatusModel findByCode(String code);

}
