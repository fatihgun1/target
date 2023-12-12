package com.target.api.target.jobs;

import com.target.api.target.facades.achievement.AchievementFacades;
import com.target.api.target.repository.ProjectRepository;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class CalculatePointTask {
    private static final Logger log = LoggerFactory.getLogger(CalculatePointTask.class);
    @Autowired
    private ProjectRepository repository;
    @Resource(name = "achievementFacades")
    private AchievementFacades achievementFacades;
    @Scheduled(cron = "0 */5 * * * *")
    public void execute() {
        log.info("Calculating project points started");
        List<String> projects = repository.collectProjectCode();
        for (String project : projects){
            achievementFacades.calculate(project);
        }
        log.info("Calculating project points finished");
    }

}
