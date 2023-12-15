package com.target.api.target.services;

import com.target.api.target.dto.MarketPageableDto;
import com.target.api.target.model.BadgeEntryModel;
import com.target.api.target.model.ContainerModel;
import com.target.api.target.model.MarketEntryModel;
import com.target.api.target.model.StatusEntryModel;
import org.springframework.data.domain.PageRequest;

public interface MarketService {
    MarketPageableDto getPageableMarketEntry(PageRequest pageRequest);
    MarketEntryModel publish(MarketEntryModel container);
    MarketEntryModel getMarket(String code);
    Boolean buy(ContainerModel container);
    BadgeEntryModel createBadgeEntry(BadgeEntryModel badgeEntryModel);
    StatusEntryModel createStatusEntry(StatusEntryModel statusEntryModel);

}
