package com.example.rms.user;

import com.example.rms.converter.DTOConverter;
import com.example.rms.exceptions.InvalidRequestBodyException;
import com.example.rms.exceptions.ResourceNotFoundException;
import com.example.rms.user.dto.UserDTO;
import com.example.rms.user.dto.UserSlim;
import com.example.rms.user.request.CreateUserRequest;
import com.example.rms.user.request.UpdateUserRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Validated
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public List<UserSlim> getUserList() {
        return userRepository.findByRemovedFalse();
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
    public UserDTO createUser(CreateUserRequest request) {
        isEmailAndPhoneValid(request.email(), request.phone(), null);
        User newUser = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .gender(request.gender())
                .dob(request.dob())
                .phone(request.phone())
                .email(request.email())
                .username(generateUsername(request))
                .password(generatePassword(request))
                .removed(false)
                .role(request.role())
                .build();

        User savedUser = userRepository.save(newUser);
        return DTOConverter.convertToDTO(savedUser, UserDTO.class);

    }

    @Override
    public UserDTO updateUser(Integer userId, UpdateUserRequest request) {
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
            user.setRole(request.role());

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
        List<String> errorList = new ArrayList<>();

        if (isEmailExists(email, updatingId)) {
            errorList.add("The email is taken (Custom Exception)");
        }
        if (isPhoneExists(phone, updatingId)) {
            errorList.add("The phone number is taken (Custom Exception");
        }
        if (errorList.size() > 0) {
            throw new InvalidRequestBodyException(errorList);
        }
    }

    private String generateUsername(CreateUserRequest request) {
        final String lastName = request.lastName();
        final String firstName = request.firstName();
        final LocalDate dob = request.dob();
        final Role role = request.role();

        String lastNameShortened = lastName.substring(0, 1).toLowerCase();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyy");
        String dobFormatted = formatter.format(dob);

        //Role: Analyst = AN; Manager: MG; Admin: AD; CRO: CO
        String roleAbbreviation = "";
        switch (role) {
            case ANALYST -> roleAbbreviation = "an";
            case MANAGER -> roleAbbreviation = "mg";
            case ADMIN -> roleAbbreviation = "ad";
            case OFFICER -> roleAbbreviation = "co";
        }

        return firstName + lastNameShortened + dobFormatted + roleAbbreviation;
    }

    private String generatePassword(CreateUserRequest request) {
        final String firstName = request.firstName();
        final LocalDate dob = request.dob();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyy");

        String dobFormatted = formatter.format(dob);

        return firstName + "@" + dobFormatted;
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
