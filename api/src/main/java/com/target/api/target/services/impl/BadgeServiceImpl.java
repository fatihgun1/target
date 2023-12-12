package com.target.api.target.services.impl;

import com.target.api.target.model.BadgeModel;
import com.target.api.target.repository.BadgeRepository;
import com.target.api.target.services.BadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service("badgeService")
public class BadgeServiceImpl implements BadgeService {
    @Autowired
    private BadgeRepository badgeRepository;

    @Override
    public List<BadgeModel> getBadgeByOwner(String owner) {
        return badgeRepository.findByOwner(owner);
    }

    @Override
    public BadgeModel getBadgeByCode(String code) {
        return badgeRepository.findByCode(code);
    }

    @Override
    public BadgeModel crateBadge(BadgeModel badge) {
        return badgeRepository.save(badge);
    }

    @Override
    public BadgeModel updateBadge(BadgeModel badge) {
        return badgeRepository.save(badge);
    }

    @Override
    public void deleteBadge(BadgeModel badge) {
        badgeRepository.delete(badge);
    }
}
