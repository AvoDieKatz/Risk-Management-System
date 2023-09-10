package com.example.rms.user;

import com.example.rms.user.dto.UserSlim;
import com.example.rms.user.request.CreateUserRequest;
import com.example.rms.user.request.UpdateUserRequest;

import java.util.List;

public interface UserService {
    List<UserSlim> getUserList();
    User getUserBy(String username);
    User getUserBy(Integer userId);
    User createUser(CreateUserRequest request);
    User updateUser(Integer userId, UpdateUserRequest request);
    void deleteUser(Integer userId);
}
