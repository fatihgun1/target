package com.target.api.target.repository;

import com.target.api.target.model.BadgeModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BadgeRepository extends JpaRepository<BadgeModel,Long> {
    BadgeModel findByCode(String code);
    List<BadgeModel> findByOwner(String code);
}
