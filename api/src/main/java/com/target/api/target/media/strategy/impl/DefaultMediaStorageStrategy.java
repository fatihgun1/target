package com.target.api.target.media.strategy.impl;

import com.target.api.target.media.data.MediaData;
import com.target.api.target.media.strategy.MediaStorageStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Objects;

@Service("defaultMediaStorageStrategy")
public class DefaultMediaStorageStrategy implements MediaStorageStrategy {
    @Value("${file.upload-dir}")
    private String projectFolder;

    @Value("${allowed.media.mime.types}")
    private String allowedMimes;
    private static final Logger LOG = LoggerFactory.getLogger(DefaultMediaStorageStrategy.class);
    @Override
    public Boolean saveMedia(MediaData mediaData) {
        LOG.info("media save location {}",mediaData.getLocation());
         final Path basePath = Paths.get("../"+mediaData.getLocation());
        LOG.info("basePath {} Location {}",basePath,mediaData.getLocation());
         try{
             InputStream inputStream = new ByteArrayInputStream(mediaData.getData());
             LOG.info("folder created");
             Files.createDirectories(basePath);
             LOG.info("folder created");
             String mime = URLConnection.guessContentTypeFromStream(inputStream);
             if (!Arrays.stream(allowedMimes.split(",")).toList().contains(mime)){
                 throw new RuntimeException("Not allowed mime type");
             }
             //todo: allowed mime type condition will be here
             //String mimeType = URLConnection.guessContentTypeFromStream(is);
             Files.copy(inputStream, basePath.resolve(mediaData.getName()));
         }catch (IOException e){
            throw new RuntimeException("FileCannot save" + e.getMessage());
         }

        return true;
    }

    @Override
    public byte[] getMedia(String path) {
        try {
            final Path basePath = Paths.get("../"+path);
            Resource resource = new UrlResource(basePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource.getContentAsByteArray();
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Boolean deleteMedia(MediaData mediaData) {
        try {
            FileSystemUtils.deleteRecursively(Path.of(mediaData.getLocation()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}
