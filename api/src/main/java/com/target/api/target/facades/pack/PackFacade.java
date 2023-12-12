package com.target.api.target.facades.pack;

import com.target.api.target.dto.PackDto;

public interface PackFacade {
    PackDto getUserPack(String owner);
}
