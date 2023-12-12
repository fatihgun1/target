package com.target.api.target.mapper;

import com.target.api.target.dto.PackDto;
import com.target.api.target.model.PackModel;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("packMapper")
public class PackMapper {
    @Resource(name = "containerMapper")
    private ContainerMapper containerMapper;
    public PackDto toMapPackDto(PackModel source){
        PackDto target = new PackDto();
        target.setContainers(containerMapper.toMapContainerList(source.getContainers()));
        return target;
    }
}
