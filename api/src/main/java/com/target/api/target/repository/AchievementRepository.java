package com.target.api.target.repository;

import com.target.api.target.model.AchievementModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AchievementRepository extends JpaRepository<AchievementModel,Long> {
    AchievementModel findByCode(String code);
    AchievementModel findByProject(String code);
    List<AchievementModel> findByOwner(String owner);
    @Query(value = "SELECT t.code, s.score  FROM status as s " +
            "JOIN todo AS t ON s.pk = t.status_pk  " +
            "JOIN project AS ts ON ts.pk = t.project_pk " +
            "WHERE  ts.code = :code AND t.is_calculated = 0 ",nativeQuery = true)
    List<Object[]> findScore(@Param("code") String code);

}
