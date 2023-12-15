package com.target.api.target.repository;

import com.target.api.target.model.StatusEntryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusEntryRepository extends JpaRepository<StatusEntryModel,Long> {
}
