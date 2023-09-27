package com.example.rms.user;

import com.example.rms.user.dto.UserDTO;
import com.example.rms.user.dto.UserSlim;
import com.example.rms.user.request.UserRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/user")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @GetMapping("greet")
    public ResponseEntity<String> greeting() {
        return new ResponseEntity<>("Hello from Admin", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Iterable<UserSlim>> getUserList() {
        // Static Method Way
        return ResponseEntity.ok(userService.getUserList());
    }

    @GetMapping("u")
    public ResponseEntity<UserDTO> getUser(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) Integer userId
    ) {

        if (userId != null) {
            return ResponseEntity.ok(userService.getUserBy(userId));
        } else {
            return ResponseEntity.ok(userService.getUserBy(username));
        }
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody @Valid UserRequest request) {
        // Object Way - Status Code only
        return new ResponseEntity<>(userService.createUser(request), HttpStatus.CREATED);
    }

    @PutMapping("{userId}")
    public ResponseEntity<UserDTO> updateUser(@RequestBody @Valid UserRequest request, @PathVariable("userId") Integer userId) {
        return new ResponseEntity<>(userService.updateUser(userId, request), HttpStatus.OK);
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("userId") Integer userId) {
        // Builder Way
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

}
