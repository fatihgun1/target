package com.target.api.target.repository;

import com.target.api.target.model.BadgeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BadgeRepository extends JpaRepository<BadgeModel,Long> {
    BadgeModel findByCode(String code);
    List<BadgeModel> findByOwner(String code);
    @Query(value = "SELECT b.* FROM project as p JOIN container as c on c.pk=p.container_pk JOIN badge as b on b.container_pk=b.pk where p.code=:code",nativeQuery = true)
    List<BadgeModel> findBadgeByCode(@Param("code") String code);
}
