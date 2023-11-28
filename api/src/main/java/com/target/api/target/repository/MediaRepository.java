package com.target.api.target.repository;

import com.target.api.target.model.MediaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<MediaModel,Long> {
}
