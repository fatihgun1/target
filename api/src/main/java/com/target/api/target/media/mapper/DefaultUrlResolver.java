package com.target.api.target.media.mapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service("defaultUrlResolver")
public class DefaultUrlResolver {
    @Value("${default.media.url.pattern}")
    private String urlRegex;

    @Value("${default.media.path.pattern}")
    private String pathPattern;
    @Value("${default.media.folder.path.pattern}")
    private String folderPathPattern;
    @Value("${default.media.url}")
    private String fullUrl;

    public String resolveUrlToPath(String url) {
        final Pattern pattern = Pattern.compile(urlRegex);
        final Matcher matcher = pattern.matcher(url);
        if (matcher.matches() && matcher.groupCount() == 4) {
            final String folder = matcher.group(1);
            final String uuid = matcher.group(2);
            final String fileName = matcher.group(3) + "." + matcher.group(4);
            List<String> folders = Arrays.asList(folder, uuid, fileName);
            return MessageFormat.format(pathPattern, folders.toArray());
        } else {
            throw new RuntimeException("Media Not Found");
        }
    }

    public String resolvePathToUrl(Object[] paths) {
        return MessageFormat.format(fullUrl, paths);
    }

    public String resolvePath(Object[] paths) {
        return MessageFormat.format(folderPathPattern, paths);
    }


}
