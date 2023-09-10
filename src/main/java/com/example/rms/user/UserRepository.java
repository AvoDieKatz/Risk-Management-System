package com.example.rms.user;

import com.example.rms.user.dto.UserSlim;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    // Under the hood
    // @Query("select u from User u where u.username = ?1")
    Optional<User> findByUsername(String username);
    List<UserSlim> findByRemovedFalse();
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);

    boolean existsByEmailAndIdNot(String email, Integer userId);
    boolean existsByPhoneAndIdNot(String phone, Integer userId);



}
