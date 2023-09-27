package com.example.rms.user;

import com.example.rms.user.dto.UserDTO;
import com.example.rms.user.dto.UserSlim;
import com.example.rms.user.request.UserRequest;

import java.util.List;

public interface UserService {
    List<UserSlim> getUserList();
    UserDTO getUserBy(String username);
    UserDTO getUserBy(Integer userId);
    UserDTO createUser(UserRequest request);
    UserDTO updateUser(Integer userId, UserRequest request);
    void deleteUser(Integer userId);
}
