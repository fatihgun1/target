package com.target.api.target.facades.market.impl;

import com.target.api.target.dto.MarketPageableDto;
import com.target.api.target.facades.market.MarketFacade;
import com.target.api.target.facades.request.MarketBuyRequestDto;
import com.target.api.target.facades.request.MarketPublishRequestDto;
import com.target.api.target.facades.request.PageableRequestDto;
import com.target.api.target.mapper.MarketMapper;
import com.target.api.target.model.ContainerModel;
import com.target.api.target.model.MarketEntryModel;
import com.target.api.target.model.PackModel;
import com.target.api.target.services.ContainerService;
import com.target.api.target.services.MarketService;
import com.target.api.target.services.PackService;
import com.target.api.target.util.CurrentUser;
import jakarta.annotation.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Service("marketFacade")
public class MarketFacadeImpl implements MarketFacade {

    @Resource(name = "marketService")
    private MarketService marketService;
    @Resource(name = "containerService")
    private ContainerService containerService;
    @Resource(name = "marketMapper")
    private MarketMapper marketMapper;
    @Resource(name = "packService")
    private PackService packService;

    @Override
    public MarketPageableDto getPageableMarketEntry(PageableRequestDto pageable) {
        return marketService.getPageableMarketEntry(PageRequest.of(pageable.getCurrent(), pageable.getPageSize()));
    }

    @Override
    public Boolean publish(MarketPublishRequestDto container) {
        ContainerModel cm = containerService.getUnpublishedContainer(container.getCode());
        if (Objects.isNull(cm)){
            return Boolean.FALSE;
        }

        try {
            marketMapper.toMapContainerModelToMarketEntryModel(cm);
            cm.setIsPublished(Boolean.TRUE);
            containerService.updateContainer(cm);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
        return Boolean.TRUE;
    }

    @Override
    public Boolean buy(MarketBuyRequestDto container) {
        PackModel pack = packService.getPackByOwner(CurrentUser.resolve());
        MarketEntryModel marketContainer = marketService.getMarket(container.getCode());
        if (Objects.isNull(pack) || Objects.isNull(marketContainer)){
            return Boolean.FALSE;
        }
        marketMapper.toMapMarketEntryModelToContainerModel(marketContainer,pack);
        return Boolean.TRUE;
    }
}
