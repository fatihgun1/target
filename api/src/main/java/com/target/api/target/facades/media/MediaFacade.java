package com.target.api.target.facades.media;

import com.target.api.target.dto.MediaDto;
import org.springframework.web.multipart.MultipartFile;

public interface MediaFacade {
    MediaDto saveMedia(MultipartFile file,String folder);
    byte[] getMedia(String path);
    Boolean deleteMedia(MultipartFile file);
}
