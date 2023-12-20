package com.target.api.target.facades.pack.impl;

import com.target.api.target.dto.PackDto;
import com.target.api.target.facades.pack.PackFacade;
import com.target.api.target.mapper.PackMapper;
import com.target.api.target.services.PackService;
import com.target.api.target.util.CurrentUser;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("packFacade")
public class PackFacadeImpl implements PackFacade {
    @Resource(name = "packService")
    private PackService packService;
    @Resource(name = "packMapper")
    private PackMapper packMapper;
    @Override
    public PackDto getUserPack() {
        return packMapper.toMapPackDto(packService.getPackByOwner(CurrentUser.resolve()));
    }
}
