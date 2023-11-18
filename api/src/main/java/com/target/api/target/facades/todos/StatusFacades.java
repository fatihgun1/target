package com.target.api.target.facades.todos;

import com.target.api.target.dto.StatusDto;
import com.target.api.target.facades.request.StatusRequestDto;

public interface StatusFacades {
    StatusDto getStatusByCode(String code);
    Boolean createStatus(StatusRequestDto statusRequestDto);
    Boolean updateStatus(StatusRequestDto statusRequestDto);
    Boolean deleteStatus(StatusRequestDto statusRequestDto);
}
