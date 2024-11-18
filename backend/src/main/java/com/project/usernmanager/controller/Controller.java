package com.project.usernmanager.controller;

import com.project.usernmanager.UsernmanagerApplication;
import com.project.usernmanager.entity.UserDTO;
import com.project.usernmanager.entity.UserEntity;
import com.project.usernmanager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class Controller {
    private final UserService userService;
    private static final Logger log = LoggerFactory.getLogger(UsernmanagerApplication.class);

    @GetMapping("/")
    public ResponseEntity<List<UserEntity>> getAllUsers(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUser());
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){
        try{
            Optional<UserEntity> user = userService.findUserById(id);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        catch (NoSuchElementException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch(Exception e){
            log.error("An error occurred. ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred." + e);
        }
    }

    @PostMapping("/")
    public ResponseEntity<String> addUser(@RequestBody UserDTO userDTO){
        try{
            userService.addUser(userDTO);
            log.info("User successfully  added!");
            return ResponseEntity.status(HttpStatus.CREATED).body("User successfully  added!");
        }
        catch (RuntimeException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        catch(Exception e){
            log.error("An error occurred.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred." + e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editUser(@PathVariable Long id, @RequestBody UserDTO userDTO){
        try {
            UserEntity updatedUser = userService.editUser(id, userDTO);
            log.info("User with ID: {} updated successfully", id);
            return ResponseEntity.ok(updatedUser);
        } catch (NoSuchElementException | IllegalArgumentException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch(Exception e){
            log.error("An error occurred.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        try{
            userService.deleteUser(id);
            log.info("User with ID: {} deleted!", id);
            return ResponseEntity.status(HttpStatus.OK).body("User with ID: " + id + " deleted!");
        } catch (NoSuchElementException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        } catch (Exception e) {
            log.error("An error occurred.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e);
        }
    }
}
