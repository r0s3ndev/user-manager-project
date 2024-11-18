package com.project.usernmanager.repository;

import com.project.usernmanager.entity.Role;
import com.project.usernmanager.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    boolean existsByName(Roles name);
    Role findByName(Roles role);
}
