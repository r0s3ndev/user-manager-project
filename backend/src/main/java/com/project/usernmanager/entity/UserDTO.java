package com.project.usernmanager.entity;

import lombok.Getter;

import java.util.Set;

@Getter
public class UserDTO {
    private String username;
    private String email;
    private Set<String> assignedRoles;
}
