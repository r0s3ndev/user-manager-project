package com.project.usernmanager.service;

import com.project.usernmanager.entity.Role;
import com.project.usernmanager.entity.Roles;
import com.project.usernmanager.entity.UserDTO;
import com.project.usernmanager.entity.UserEntity;
import com.project.usernmanager.repository.RoleRepository;
import com.project.usernmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;


    public List<UserEntity> getAllUser(){
        return userRepository.findAll();
    }


    public void addUser(UserDTO userDTO){
        //check if email already exist
        Optional<UserEntity> checkUserEmail = userRepository.findByEmail(userDTO.getEmail());
        if(checkUserEmail.isPresent()){
            throw new IllegalArgumentException("Email already registered!");
        }

        UserEntity user = new UserEntity();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());

        Set<Role> roles = new HashSet<>();
        if(userDTO.getAssignedRoles() != null) {
            for (String roleName : userDTO.getAssignedRoles()) {
                try {
                    Role role = roleRepository.findByName(Roles.valueOf(roleName.toUpperCase()));
                    roles.add(role);
                } catch (IllegalArgumentException e) {
                    throw new RuntimeException("Invalid role name provided: " + roleName, e);
                }
            }
        }
        user.setAssignedRoles(roles);
        userRepository.save(user);
    }


    public Optional<UserEntity> findUserById(Long id){
        Optional<UserEntity> user = userRepository.findById(id);
        if(user.isEmpty()){
            throw new NoSuchElementException("User with ID: " + id + " not found!");
        }
        return user;
    }


    public UserEntity editUser(Long id, UserDTO updatedUser) {
        UserEntity existingUser = userRepository.findUserById(id);
        if (existingUser == null) {
            throw new NoSuchElementException("Cannot edit user with ID: " + id + ", User not found!");
        }

        //check if updated-email already exist
        Optional<UserEntity> email = userRepository.findByEmail(updatedUser.getEmail());
        if(email.isPresent()){
            throw new IllegalArgumentException("Cannot update to this email! Email already registered!");
        }

        if(updatedUser.getAssignedRoles() != null){
            Set<Role> roles = new HashSet<>();
            for(String roleName : updatedUser.getAssignedRoles()){
                try{
                    Role role = roleRepository.findByName(Roles.valueOf(roleName.toUpperCase()));
                    roles.add(role);
                } catch (IllegalArgumentException e) {
                    throw new RuntimeException("Invalid role name provided: " + roleName, e);
                }
            }
            existingUser.setAssignedRoles(roles);
        }
        if(updatedUser.getUsername() != null || updatedUser.getEmail() != null) {
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
        }

        return userRepository.save(existingUser);
    }


    public void deleteUser(Long id){
        Optional<UserEntity> checkUser = userRepository.findById(id);
        if(checkUser.isEmpty()){
            throw new NoSuchElementException("Cannot delete user with ID: " + id + ", User not found!");
        }
        userRepository.deleteById(id);
    }
}


