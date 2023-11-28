package com.target.api.target.controller.media;

import com.target.api.target.dto.MediaDto;
import com.target.api.target.facades.media.MediaFacade;
import com.target.api.target.media.data.MediaData;
import com.target.api.target.media.util.ValidateFolder;
import com.target.api.target.services.MediaService;
import jakarta.annotation.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(value = "/media",method = RequestMethod.GET)
public class MediaController {

    @Resource(name = "mediaFacade")
    private MediaFacade mediaFacade;
    @Resource(name = "validateFolder")
    private ValidateFolder validateFolder;
    @PostMapping("/upload")
    public MediaDto upload(@RequestParam("data")  MultipartFile file, @RequestParam("type") String folder){
        if (validateFolder.validate(folder)){
            return mediaFacade.saveMedia(file,folder);
        }else {
            throw new RuntimeException("Connection Refuse");
        }
    }

    @GetMapping("/m/{url}")
    @ResponseBody
    public ResponseEntity<byte[]> getMedia(@PathVariable String url){
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(mediaFacade.getMedia(url));
    }
}
