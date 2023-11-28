package com.target.api.target.services;

import com.target.api.target.media.data.MediaData;
import com.target.api.target.model.MediaModel;
import org.springframework.core.io.Resource;

public interface MediaService {
    MediaModel saveMedia(MediaData mediaData);
    byte[] getMedia(String path);
    Boolean deleteMedia(MediaData mediaData);
}
