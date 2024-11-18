package com.project.usernmanager.initializer;

import com.project.usernmanager.entity.Role;
import com.project.usernmanager.entity.Roles;
import com.project.usernmanager.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoleDataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        for(Roles role : Roles.values()){
            if(!roleRepository.existsByName(role)){
                Role newRole = new Role(role);
                roleRepository.save(newRole);
            }
        }
    }
}
