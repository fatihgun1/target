package com.target.api.target.services.impl;

import com.target.api.target.media.data.MediaData;
import com.target.api.target.media.mapper.DefaultUrlResolver;
import com.target.api.target.media.strategy.MediaStorageStrategy;
import com.target.api.target.model.MediaModel;
import com.target.api.target.repository.MediaRepository;
import com.target.api.target.services.MediaService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service("mediaService")
public class MediaServiceImpl implements MediaService {
    @Value("${default.media.storage.strategy}")
    private String defaultMediaStorage;
    @Autowired
    private ApplicationContext context;
    @Autowired
    private MediaRepository mediaRepository;
    @Resource(name = "defaultUrlResolver")
    private DefaultUrlResolver defaultUrlResolver;


    @Override
    public MediaModel saveMedia(MediaData mediaData) {
        MediaModel media = this.saveModel(mediaData);
        mediaData.setLocation(media.getLocation());
        this.saveFile(mediaData);
        return media;
    }

    @Override
    public byte[] getMedia(String path) {
        MediaStorageStrategy strategy = (MediaStorageStrategy) context.getBean(defaultMediaStorage);
        return strategy.getMedia(defaultUrlResolver.resolveUrlToPath(path));
    }

    @Override
    public Boolean deleteMedia(MediaData mediaData) {
        return null;
    }

    protected MediaModel saveModel(MediaData source){
        MediaModel target = new MediaModel();
        String uuid = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        String code = UUID.randomUUID().toString();
        String originalName = source.getName().replace(" ","_");
        Object[] paths = List.of(source.getFolder(),uuid,originalName).toArray();
        source.setName(originalName);
        target.setCode(code);
        target.setUuid(uuid);
        target.setFolder(source.getFolder());
        target.setUrl(defaultUrlResolver.resolvePathToUrl(paths));
        target.setLocation(defaultUrlResolver.resolvePath(paths));
        return mediaRepository.save(target);
    }

    protected Boolean saveFile(MediaData mediaData){
        MediaStorageStrategy strategy = (MediaStorageStrategy) context.getBean(defaultMediaStorage);
        //todo: resolve location
        return strategy.saveMedia(mediaData);
    }
}
