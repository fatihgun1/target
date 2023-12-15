package com.target.api.target.mapper;

import com.target.api.target.dto.MarketEntryDto;
import com.target.api.target.model.*;
import com.target.api.target.services.BadgeService;
import com.target.api.target.services.ContainerService;
import com.target.api.target.services.MarketService;
import com.target.api.target.services.StatusService;
import jakarta.annotation.Resource;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service("marketMapper")
public class MarketMapper {

    @Resource(name = "badgeEntryMapper")
    private BadgeEntryMapper badgeEntryMapper;
    @Resource(name = "statusEntryMapper")
    private StatusEntryMapper statusEntryMapper;
    @Lazy
    @Resource(name = "marketService")
    private MarketService marketService;
    @Resource(name = "containerService")
    private ContainerService containerService;
    @Resource(name = "badgeService")
    private BadgeService badgeService;
    @Resource(name = "statusService")
    private StatusService statusService;
    public MarketEntryDto toMapMarketEntryDto(MarketEntryModel source) {
        MarketEntryDto target = new MarketEntryDto();
        target.setCode(source.getCode());
        target.setName(source.getName());
        target.setOwner(source.getOwner());
        target.setBadges(badgeEntryMapper.toMapBadgeEntryList(source.getBadgeEntry()));
        target.setStatus(statusEntryMapper.toMapStatusEntryList(source.getStatusEntry()));
        return target;
    }

    public List<MarketEntryDto> toMapMarketDtoList(List<MarketEntryModel> source){
        if (CollectionUtils.isEmpty(source)){
            return Collections.emptyList();
        }
        List<MarketEntryDto> target = new ArrayList<>();
        for (MarketEntryModel marketEntry : source){
            target.add(this.toMapMarketEntryDto(marketEntry));
        }
        return target;
    }

    public void toMapContainerModelToMarketEntryModel(ContainerModel source){
        MarketEntryModel target = new MarketEntryModel();
        target.setCode(UUID.randomUUID().toString());
        target.setName(source.getName());

        MarketEntryModel marketEntryModel = marketService.publish(target);

        for (BadgeModel badge: source.getBadge()){
            BadgeEntryModel badgeEntry = new BadgeEntryModel();
            this.populateBadgeModel(badgeEntry,badge,marketEntryModel);
        }

        for (StatusModel status : source.getStatus()){
            StatusEntryModel statusEntry = new StatusEntryModel();
            this.populateStatusModel(statusEntry,status,marketEntryModel);
        }
    }

    public void toMapMarketEntryModelToContainerModel(MarketEntryModel source,PackModel relation){
        ContainerModel target = new ContainerModel();
        target.setPack(relation);
        target.setIsPublished(Boolean.FALSE);
        target.setCode(UUID.randomUUID().toString());
        target.setName(source.getName());
        ContainerModel container = containerService.createContainer(target);
        for (BadgeEntryModel badgeEntry : source.getBadgeEntry()){
            BadgeModel badge = new BadgeModel();
            this.populateBadgeEntryModel(badge,badgeEntry,container);
        }
        for (StatusEntryModel statusEntry : source.getStatusEntry()){
            StatusModel status = new StatusModel();
            this.populateStatusEntryModel(status,statusEntry,container);
        }
    }


    private void populateBadgeModel(BadgeEntryModel target,BadgeModel source,MarketEntryModel relation){
        target.setCode(UUID.randomUUID().toString());
        target.setName(source.getName());
        target.setDescription(source.getDescription());
        target.setOwner(source.getOwner());
        target.setScore(source.getScore());
        target.setMediaUrl(source.getMediaUrl());
        target.setMarketEntry(relation);
        marketService.createBadgeEntry(target);
    }

    private void populateStatusModel(StatusEntryModel target, StatusModel source, MarketEntryModel relation){
        target.setCode(UUID.randomUUID().toString());
        target.setName(source.getName());
        target.setScore(source.getScore());
        target.setMarketEntry(relation);
        marketService.createStatusEntry(target);
    }


    private void populateBadgeEntryModel(BadgeModel target,BadgeEntryModel source,ContainerModel relation){
        target.setCode(UUID.randomUUID().toString());
        target.setName(source.getName());
        target.setDescription(source.getDescription());
        target.setScore(source.getScore());
        target.setMediaUrl(source.getMediaUrl());
        target.setContainer(relation);
        badgeService.crateBadge(target);
    }

    private void populateStatusEntryModel(StatusModel target,StatusEntryModel source,ContainerModel relation){
        target.setCode(UUID.randomUUID().toString());
        target.setName(source.getName());
        target.setScore(source.getScore());
        target.setContainer(relation);
        statusService.createStatus(target);
    }
}
