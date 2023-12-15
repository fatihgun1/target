package com.target.api.target.repository;

import com.target.api.target.model.BadgeEntryModel;
import com.target.api.target.model.MarketEntryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeEntryRepository extends JpaRepository<BadgeEntryModel,Long> {
}
