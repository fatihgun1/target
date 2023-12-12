package com.target.api.target.services;

import com.target.api.target.model.BadgeModel;

import java.util.List;

public interface BadgeService {
    List<BadgeModel> getBadgeByOwner(String owner);
    BadgeModel getBadgeByCode(String code);
    BadgeModel crateBadge(BadgeModel badge);
    BadgeModel updateBadge(BadgeModel badge);
    void deleteBadge(BadgeModel badge);
}
