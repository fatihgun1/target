package com.target.api.target.facades.media.impl;

import com.target.api.target.dto.MediaDto;
import com.target.api.target.facades.media.MediaFacade;
import com.target.api.target.mapper.MediaMapper;
import com.target.api.target.media.data.MediaData;
import com.target.api.target.services.MediaService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Service("mediaFacade")
public class MediaFacadeImpl implements MediaFacade {
    @Resource(name = "mediaService")
    private MediaService mediaService;
    @Resource(name = "mediaMapper")
    private MediaMapper mediaMapper;
    @Override
    public MediaDto saveMedia(MultipartFile file,String folder) {
        MediaData media = new MediaData();
        try {
            media.setData(file.getBytes());
            media.setName(file.getOriginalFilename());
            media.setMime(file.getContentType());
            media.setFolder(folder);
             return mediaMapper.toBadgeDto(mediaService.saveMedia(media));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public byte[] getMedia(String path) {
        final String decodeUrl = URLDecoder.decode(path, StandardCharsets.UTF_8);
        return mediaService.getMedia(decodeUrl);
    }

    @Override
    public Boolean deleteMedia(MultipartFile file) {
        return null;
    }
}
