package com.target.api.target.facades.achievement.impl;

import com.target.api.target.dto.BadgeDto;
import com.target.api.target.facades.achievement.BadgeFacades;
import com.target.api.target.facades.request.BadgeRequestDto;
import com.target.api.target.mapper.BadgeMapper;
import com.target.api.target.model.BadgeModel;
import com.target.api.target.services.BadgeService;
import com.target.api.target.services.ContainerService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service("badgeFacades")
public class BadgeFacadesImpl implements BadgeFacades {
    @Resource(name = "badgeService")
    private BadgeService badgeService;
    @Resource(name = "badgeMapper")
    private BadgeMapper badgeMapper;
    @Resource(name = "containerService")
    private ContainerService containerService;

    @Override
    public List<BadgeDto> getBadgeByOwner(String owner) {
        return badgeMapper.toBadgeDtoList(badgeService.getBadgeByOwner(owner));
    }

    @Override
    public BadgeDto getBadgeByCode(String code) {
        return badgeMapper.toBadgeDto(badgeService.getBadgeByCode(code));
    }

    @Override
    public void crateBadge(BadgeRequestDto source) {
        BadgeModel target = new BadgeModel();
        target.setCode(UUID.randomUUID().toString());
        target.setName(source.getName());
        target.setDescription(source.getDescription());
        target.setScore(Long.valueOf(source.getScore()));
        target.setOwner(source.getOwner());
        target.setMediaUrl(source.getMediaUrl());
        target.setContainer(containerService.getContainer(source.getContainer()));
        badgeService.crateBadge(target);
    }

    @Override
    public Boolean updateBadge(BadgeRequestDto source) {
        BadgeModel target = badgeService.getBadgeByCode(source.getCode());
        if (Objects.isNull(target)){
            return false;
        }
        target.setName(source.getName());
        target.setDescription(source.getDescription());
        target.setScore(Long.valueOf(source.getScore()));
        target.setMediaUrl(source.getMediaUrl());
        badgeService.updateBadge(target);
        return true;
    }

    @Override
    public Boolean deleteBadge(BadgeRequestDto badge) {
        BadgeModel target = badgeService.getBadgeByCode(badge.getCode());
        if (Objects.isNull(target)){
            return false;
        }
        badgeService.deleteBadge(target);
        return true;

    }
}
