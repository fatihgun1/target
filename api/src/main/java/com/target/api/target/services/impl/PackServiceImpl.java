package com.target.api.target.services.impl;

import com.target.api.target.model.PackModel;
import com.target.api.target.repository.PackRepository;
import com.target.api.target.services.PackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service("packService")
public class PackServiceImpl implements PackService {

    @Autowired
    private PackRepository packRepository;

    @Override
    public PackModel getPackByOwner(String owner) {
        PackModel pack = packRepository.findByOwner(owner);
        if (Objects.isNull(pack)){
            return this.createPack(owner);
        }
        return pack;
    }

    private PackModel createPack(String owner) {
        PackModel n_Pack = new PackModel();
        n_Pack.setOwner(owner);
        return packRepository.save(n_Pack);
    }

    @Override
    public void deletePack(String owner) {
        PackModel pack = packRepository.findByOwner(owner);
        if (Objects.nonNull(pack)){
            packRepository.delete(pack);
        }
    }
}
