package com.target.api.target.repository;

import com.target.api.target.model.PackModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackRepository extends JpaRepository<PackModel,Long> {
    PackModel findByOwner(String owner);

}
