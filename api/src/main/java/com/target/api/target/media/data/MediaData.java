package com.target.api.target.media.data;

import lombok.Data;

@Data
public class MediaData {
    private String name;
    private String mime;
    private String folder;
    private String location;
    private String format;
    private byte[] data;
}

