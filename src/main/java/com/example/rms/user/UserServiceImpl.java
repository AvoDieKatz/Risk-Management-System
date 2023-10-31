package com.example.rms.user;

import com.example.rms.converter.DTOConverter;
import com.example.rms.exceptions.InvalidRequestBodyException;
import com.example.rms.exceptions.ResourceNotFoundException;
import com.example.rms.user.dto.UserDTO;
import com.example.rms.user.dto.UserSlim;
import com.example.rms.user.request.UserRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Validated
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder encoder;

    @Override
    public List<UserSlim> getUserList() {
        return userRepository.findByRemovedFalseOrderByCreatedAtDesc();
    }

    @Override
    public UserDTO getUserBy(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return DTOConverter.convertToDTO(user, UserDTO.class);
        }
        throw new ResourceNotFoundException("User `" +username+ "` does not exist");
    }

    @Override
    public UserDTO getUserBy(Integer userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            return DTOConverter.convertToDTO(optionalUser.get(), UserDTO.class);
        }
        throw new ResourceNotFoundException("User with ID `" +userId+ "` does not exist");
    }

    @Override
    public UserDTO createUser(UserRequest request) {
        isEmailAndPhoneValid(request.email(), request.phone(), null);
        User newUser = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .gender(request.gender())
                .dob(request.dob())
                .phone(request.phone())
                .email(request.email())
                .username(generateUsername(request.email()))
                .password(generatePassword(request))
                .removed(false)
                .role(Role.ANALYST)
                .build();

        User savedUser = userRepository.save(newUser);
        return DTOConverter.convertToDTO(savedUser, UserDTO.class);

    }

    @Override
    public UserDTO updateUser(Integer userId, UserRequest request) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            isEmailAndPhoneValid(request.email(), request.phone(), userId);

            User user = optionalUser.get();

            user.setLastName(request.lastName());
            user.setFirstName(request.firstName());
            user.setGender(request.gender());
            user.setDob(request.dob());
            user.setEmail(request.email());
            user.setPhone(request.phone());

            User savedUser = userRepository.save(user);
            return DTOConverter.convertToDTO(savedUser, UserDTO.class);

        }
        throw new ResourceNotFoundException("User " +userId+ " does not exist");
    }

    @Override
    public void deleteUser(Integer userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setRemoved(true);
            userRepository.save(user);
        }
        throw new ResourceNotFoundException("User " +userId+ " does not exist");
    }

    /*---------------------------------------*
    *                                        *
    *           SUPPORTING FUNCTIONS         *
    *                                        *
    *----------------------------------------*/

    private void isEmailAndPhoneValid(String email, String phone, Integer updatingId) {
        HashMap<String, String> errorMap = new HashMap<>();

        if (isEmailExists(email, updatingId)) {
            errorMap.put("email", "The email is taken.");
        }
        if (isPhoneExists(phone, updatingId)) {
            errorMap.put("phone", "The phone number is taken.");
        }
        if (errorMap.size() > 0) {
            throw new InvalidRequestBodyException(errorMap);
        }
    }

    private String generateUsername(String email) {
        return email.substring(0, email.indexOf("@"));
    }

    private String generatePassword(UserRequest request) {
        final String firstName = request.firstName().toLowerCase();
        final LocalDate dob = request.dob();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyy");

        String dobFormatted = formatter.format(dob);

        return encoder.encode(firstName + "@" + dobFormatted);
    }

    private boolean isPhoneExists(String phone, Integer updatingId) {
        if (updatingId != null) {
            return userRepository.existsByPhoneAndIdNot(phone, updatingId);
        }
        return userRepository.existsByPhone(phone);
    }

    private boolean isEmailExists(String email, Integer updatingId) {
        if (updatingId != null) {
            return userRepository.existsByEmailAndIdNot(email, updatingId);
        }
        return userRepository.existsByEmail(email);
    }
}
