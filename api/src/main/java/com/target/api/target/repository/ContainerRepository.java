package com.target.api.target.repository;

import com.target.api.target.model.ContainerModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContainerRepository extends JpaRepository<ContainerModel,Long> {
    ContainerModel findByCode(String code);

}
