package com.target.api.target.repository;

import com.target.api.target.model.MarketEntryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketEntryRepository extends JpaRepository<MarketEntryModel,Long> {
    MarketEntryModel findByCode(String code);
}
