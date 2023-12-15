package com.target.api.target.facades.market;

import com.target.api.target.dto.MarketEntryDto;
import com.target.api.target.dto.MarketPageableDto;
import com.target.api.target.facades.request.MarketBuyRequestDto;
import com.target.api.target.facades.request.MarketPublishRequestDto;
import com.target.api.target.facades.request.PageableRequestDto;

public interface MarketFacade {
    MarketPageableDto getPageableMarketEntry(PageableRequestDto pageable);
    Boolean publish(MarketPublishRequestDto containerCode);
    Boolean buy(MarketBuyRequestDto container);
}
