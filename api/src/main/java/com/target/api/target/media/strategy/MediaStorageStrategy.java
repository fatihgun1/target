package com.target.api.target.media.strategy;


import com.target.api.target.media.data.MediaData;
import org.springframework.core.io.Resource;

public interface MediaStorageStrategy {

    Boolean saveMedia(MediaData mediaData);
    byte[] getMedia(String path);
    Boolean deleteMedia(MediaData mediaData);
}
