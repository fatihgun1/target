package com.target.api.target.facades.achievement;

import com.target.api.target.dto.BadgeDto;
import com.target.api.target.facades.request.BadgeRequestDto;

import java.util.List;

public interface BadgeFacades {
    List<BadgeDto> getBadgeByOwner(String owner);
    BadgeDto getBadgeByCode(String code);
    void crateBadge(BadgeRequestDto badge);
    Boolean updateBadge(BadgeRequestDto badge);
    Boolean deleteBadge(BadgeRequestDto badge);
}
