package com.example.rms.user;

import com.example.rms.user.dto.UserSlim;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@ActiveProfiles("test")
public class UserRepositoryTests {

    private final UserRepository userRepository;

    @Autowired
    public UserRepositoryTests(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @BeforeEach
    void setUp() {
        User user1 = User.builder()
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
        User user2 = User.builder()
                .lastName("Avo")
                .firstName("Ngao")
                .dob(LocalDate.of(2018, 9, 20))
                .gender(Gender.FEMALE)
                .phone("0912345669")
                .email("avong@mail.com")
                .username("AvoNg200918")
                .password("Avo@200918")
                .role(Role.ANALYST)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        User user3 = User.builder()
                .lastName("Tung")
                .firstName("Ngao")
                .dob(LocalDate.of(2018, 9, 20))
                .gender(Gender.FEMALE)
                .phone("0912345601")
                .email("tungng@mail.com")
                .username("TungNg200918")
                .password("Tung@200918")
                .role(Role.MANAGER)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
    }

    @Test
    void GivenNothing_GetUserList_ReturnUsers() {
        List<UserSlim> userList = userRepository.findByRemovedFalse();
        Assertions.assertThat(userList).isNotNull();
        Assertions.assertThat(userList.size()).isGreaterThanOrEqualTo(2);
    }
}
