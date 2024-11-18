package com.project.usernmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private Roles name;
    @ManyToMany(mappedBy = "assignedRoles")
    @JsonIgnore
    Set<UserEntity> usersSet = new HashSet<>();

    public Role(Roles name){
        this.name = name;
    }
}
