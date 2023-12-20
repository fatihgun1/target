package com.target.api.target.facades.achievement.impl;

import com.target.api.target.dto.BadgeDto;
import com.target.api.target.facades.achievement.BadgeFacades;
import com.target.api.target.facades.request.BadgeRequestDto;
import com.target.api.target.mapper.BadgeMapper;
import com.target.api.target.model.BadgeModel;
import com.target.api.target.services.BadgeService;
import com.target.api.target.services.ContainerService;
import com.target.api.target.util.CurrentUser;
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
    public List<BadgeDto> getBadgeByOwner() {
        return badgeMapper.toBadgeDtoList(badgeService.getBadgeByOwner(CurrentUser.resolve()));
    }

    @Override
    public BadgeDto getBadgeByCode(String code) {
        return badgeMapper.toBadgeDto(badgeService.getBadgeByCode(code));
    }

    @Override
    public BadgeDto crateBadge(BadgeRequestDto source) {
        BadgeModel target = new BadgeModel();
        target.setCode(UUID.randomUUID().toString());
        target.setName(source.getName());
        target.setDescription(source.getDescription());
        target.setScore(Long.valueOf(source.getScore()));
        target.setOwner(CurrentUser.resolve());
        target.setMediaUrl(source.getMediaUrl());
        target.setContainer(containerService.getContainer(source.getContainer()));
        return badgeMapper.toBadgeDto(badgeService.crateBadge(target));
    }

    @Override
    public BadgeDto updateBadge(BadgeRequestDto source) {
        BadgeModel target = badgeService.getBadgeByCode(source.getCode());
        if (Objects.isNull(target)){
            return null;
        }
        target.setName(source.getName());
        target.setDescription(source.getDescription());
        target.setScore(Long.valueOf(source.getScore()));
        target.setMediaUrl(source.getMediaUrl());
        return badgeMapper.toBadgeDto(badgeService.updateBadge(target));
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
