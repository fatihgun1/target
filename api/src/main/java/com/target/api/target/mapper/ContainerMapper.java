package com.target.api.target.mapper;

import com.target.api.target.dto.ContainerDto;
import com.target.api.target.model.ContainerModel;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("containerMapper")
public class ContainerMapper {
    @Resource(name = "badgeMapper")
    private BadgeMapper badgeMapper;
    @Resource(name = "statusMapper")
    private StatusMapper statusMapper;
    public ContainerDto toMapContainerDto(ContainerModel source){
        ContainerDto target = new ContainerDto();
        target.setCode(source.getCode());
        target.setName(source.getName());
        target.setBadges(badgeMapper.toBadgeDtoList(source.getBadge()));
        target.setStatus(statusMapper.toMapStatusList(source.getStatus()));
        return target;
    }

    public List<ContainerDto> toMapContainerList(List<ContainerModel> source){
        List<ContainerDto> target = new ArrayList<>();
        for (ContainerModel container : source){
            target.add(this.toMapContainerDto(container));
        }
        return target;
    }
}
