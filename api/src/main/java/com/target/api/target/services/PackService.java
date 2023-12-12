package com.target.api.target.services;

import com.target.api.target.model.PackModel;

public interface PackService {
    PackModel getPackByOwner(String owner);

    void deletePack(String owner);
}
