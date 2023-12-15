package com.target.api.target.repository;

import com.target.api.target.model.MarketEntryModel;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface MarketPageableRepository extends PagingAndSortingRepository<MarketEntryModel,Long> {
    MarketEntryModel findByCode(String code);
}
