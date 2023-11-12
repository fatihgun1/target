package com.target.api.target.repository;

import com.target.api.target.model.RoleEnum;
import com.target.api.target.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Long> {
    Optional<UserModel> findByEmail(String email);
    UserModel findByRoles(RoleEnum roles);
}