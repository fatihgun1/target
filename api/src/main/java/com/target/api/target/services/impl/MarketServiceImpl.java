package com.target.api.target.services.impl;

import com.target.api.target.dto.MarketEntryDto;
import com.target.api.target.dto.MarketPageableDto;
import com.target.api.target.mapper.MarketMapper;
import com.target.api.target.model.BadgeEntryModel;
import com.target.api.target.model.ContainerModel;
import com.target.api.target.model.MarketEntryModel;
import com.target.api.target.model.StatusEntryModel;
import com.target.api.target.repository.*;
import com.target.api.target.services.MarketService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service("marketService")
public class MarketServiceImpl implements MarketService {
    @Autowired
    private MarketEntryRepository marketEntryRepository;
    @Autowired
    private ContainerRepository containerRepository;
    @Autowired
    private MarketPageableRepository marketPageableRepository;
    @Autowired
    private BadgeEntryRepository badgeEntryRepository;
    @Autowired
    private StatusEntryRepository statusEntryRepository;
    @Resource(name = "marketMapper")
    private MarketMapper marketMapper;

    @Override
    public MarketPageableDto getPageableMarketEntry(PageRequest pageRequest) {
        MarketPageableDto response = new MarketPageableDto();
        Page<MarketEntryModel> result = marketPageableRepository.findAll(pageRequest);
        response.setTotalPage(result.getTotalPages());
        response.setCurrentPage(pageRequest.getPageNumber());
        response.setPageSize(pageRequest.getPageSize());
        response.setEntries(marketMapper.toMapMarketDtoList(result.getContent()));
        return response;
    }

    @Override
    public MarketEntryModel getMarket(String code) {
        return marketEntryRepository.findByCode(code);
    }

    @Override
    public MarketEntryModel publish(MarketEntryModel container) {
        return marketEntryRepository.save(container);
    }

    @Override
    public Boolean buy(ContainerModel container) {
        return Objects.nonNull(containerRepository.save(container));
    }

    @Override
    public BadgeEntryModel createBadgeEntry(BadgeEntryModel badgeEntryModel) {
        return badgeEntryRepository.save(badgeEntryModel);
    }

    @Override
    public StatusEntryModel createStatusEntry(StatusEntryModel statusEntryModel) {
        return statusEntryRepository.save(statusEntryModel);
    }
}
