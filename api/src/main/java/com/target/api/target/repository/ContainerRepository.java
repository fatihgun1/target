package com.target.api.target.repository;

import com.target.api.target.model.ContainerModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContainerRepository extends JpaRepository<ContainerModel,Long> {
    ContainerModel findByCode(String code);
    @Query(value = "SELECT * FROM container as c where (c.is_published is null or c.is_published = 0) and c.code = :code",nativeQuery = true)
    ContainerModel findByPublished(@Param("code") String code);
}
