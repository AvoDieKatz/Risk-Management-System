package com.example.rms.user;

import com.example.rms.user.dto.UserSlim;
import com.example.rms.user.request.CreateUserRequest;
import com.example.rms.user.request.UpdateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
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
    public ResponseEntity<User> getUser(
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
    @ResponseBody
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest request) {
        // Object Way - Status Code only
        return new ResponseEntity<>(userService.createUser(request), HttpStatus.CREATED);
    }

    @PutMapping("{userId}")
    public ResponseEntity<User> updateUser(@RequestBody UpdateUserRequest request, @PathVariable("userId") Integer userId) {
        return new ResponseEntity<>(userService.updateUser(userId, request), HttpStatus.OK);
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("userId") Integer userId) {
        // Builder Way
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

}
