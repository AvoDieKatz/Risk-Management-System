package com.example.rms.user;

import com.example.rms.user.dto.UserDTO;
import com.example.rms.user.dto.UserSlim;
import com.example.rms.user.request.UserRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;


@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class UserServiceTests {
    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserServiceImpl service;

    private final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    private final List<UserSlim> userList = new ArrayList<>();

    interface UserSlimTest extends UserSlim {
        void setId(Integer id);
        void setLastName(String lastName);
        void setFirstName(String firstName);
        void setGender(Gender gender);
        void setDob(LocalDate dob);
        void setPhone(String phone);
        void setEmail(String email);
        void setUsername(String username);
        void setCreatedAt(LocalDateTime createdAt);
        void setRole(Role role);
    }

    @BeforeEach
    void setUp() {
        var analyst = factory.createProjection(UserSlimTest.class);
        analyst.setId(1);
        analyst.setFirstName("Tung");
        analyst.setLastName("Tran");
        analyst.setGender(Gender.MALE);
        analyst.setDob(LocalDate.of(1999,9,20));
        analyst.setPhone("09818712738");
        analyst.setEmail("tung@mail.com");
        analyst.setUsername("TungTr@200999");
        analyst.setCreatedAt(LocalDateTime.now());
        analyst.setRole(Role.ANALYST);

        var manager = factory.createProjection(UserSlimTest.class);
        manager.setId(2);
        manager.setFirstName("Avo");
        manager.setLastName("Tran");
        manager.setGender(Gender.FEMALE);
        manager.setDob(LocalDate.of(1999,9,20));
        manager.setPhone("09818712739");
        manager.setEmail("avo@mail.com");
        manager.setUsername("AvoTr200999");
        manager.setCreatedAt(LocalDateTime.now());
        manager.setRole(Role.MANAGER);

        userList.add(analyst);
        userList.add(manager);
    }

    @Test
    void givenNone_findAllActiveUsers_returnAllActiveUsers() {
        // Arrange
        given(repository.findByRemovedFalseOrderByCreatedAtDesc()).willReturn(userList);

        // Act
        List<UserSlim> savedUser = service.getUserList();

        // Assert
        Assertions.assertThat(savedUser).isNotNull();
        Assertions.assertThat(savedUser.get(0).getId()).isEqualTo(1);
    }

    @Test
    void givenUsername_findUserByUsername_returnUserDetail() {
        // Arrange
        String username = "TungTr200999";
        User newUser = User.builder()
                .lastName("Tung")
                .firstName("Tran")
                .dob(LocalDate.of(1999, 9, 20))
                .gender(Gender.MALE)
                .phone("0912345678")
                .email("tungtr@mail.com")
                .username(username)
                .password("Tung@200999")
                .role(Role.ANALYST)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        given(repository.findByUsername(username))
                .willReturn(Optional.ofNullable(newUser));

        // Act
        UserDTO userReturn = service.getUserBy(username);

        // Assert
        Assertions.assertThat(userReturn).isNotNull();
        Assertions.assertThat(userReturn.getUsername()).isEqualTo(username);
    }


    @Test
    void givenId_findUserById_returnUserDetail() {
        // Arrange
        int userId = 1;
        User newUser = User.builder()
                .id(1)
                .lastName("Tung")
                .firstName("Tran")
                .dob(LocalDate.of(1999, 9, 20))
                .gender(Gender.MALE)
                .phone("0912345678")
                .email("tungtr@mail.com")
                .username("TungTr200999")
                .password("Tung@200999")
                .role(Role.ANALYST)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        given(repository.findById(userId))
                .willReturn(Optional.ofNullable(newUser));

        // Act
        UserDTO userReturn = service.getUserBy(userId);

        // Assert
        Assertions.assertThat(userReturn).isNotNull();
        Assertions.assertThat(userReturn.getId()).isEqualTo(userId);
    }

    @Test
    void givenNone_createUser_returnCreatedUser() {
        String firstName = "Tung";
        String lastName = "Tran";
        LocalDate dob = LocalDate.of(1999, 9, 20);
        Gender gender = Gender.MALE;
        String phone = "0912345678";
        String email = "tungtr@mail.com";
        Role role = Role.ANALYST;

        User newUser = User.builder()
                .lastName(lastName)
                .firstName(firstName)
                .dob(dob)
                .gender(gender)
                .phone(phone)
                .email(email)
                .username("Tungtr200999an")
                .password("Tung@200999")
                .role(role)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        UserRequest request = new UserRequest(
                firstName,
                lastName,
                gender,
                dob,
                email,
                phone,
                role
        );

        given(repository.save(Mockito.any(User.class))).willReturn(newUser);

        UserDTO savedUser = service.createUser(request);

        Assertions.assertThat(savedUser).isNotNull();
        Assertions.assertThat(savedUser.getUsername()).isEqualTo("Tungtr200999an");
    }

}
