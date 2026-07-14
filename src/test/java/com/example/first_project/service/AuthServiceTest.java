package com.example.first_project.service;

import com.example.first_project.dto.AuthResponse;
import com.example.first_project.dto.LoginRequest;
import com.example.first_project.dto.RegisterRequest;
import com.example.first_project.model.Role;
import com.example.first_project.model.User;
import com.example.first_project.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder  passwordEncoder;

    @Mock
    private JwtService jwtService;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(userRepository, passwordEncoder, jwtService);

        ReflectionTestUtils.setField(authService, "adminUsername", "admin");
        ReflectionTestUtils.setField(authService, "adminPassword", "adminpassword");
    }

    @Test
    void registerCreatesUserWithUserRole() {
        RegisterRequest request = new RegisterRequest("john", "123", null);

        when(userRepository.existsByUsername("john")).thenReturn(false);
        when(passwordEncoder.encode("123")).thenReturn("hashed-password");
        when(jwtService.generateToken(any(User.class))).thenReturn("jwt-token");

        AuthResponse response = authService.register(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();

        assertThat(savedUser.getUsername()).isEqualTo("john");
        assertThat(savedUser.getPassword()).isEqualTo("hashed-password");
        assertThat(savedUser.getRole()).isEqualTo(Role.USER);
        assertThat(response.getToken()).isEqualTo("jwt-token");
    }

    @Test
    void loginAdminReturnesAdminToken() {
        LoginRequest request = new LoginRequest("admin", "adminpassword");

        when(jwtService.generateToken(any(User.class))).thenReturn("admin-token");

        AuthResponse response = authService.login(request);

        assertThat(response.getToken()).isEqualTo("admin-token");
        verify(userRepository, never()).findByUsername(anyString());
    }

    @Test
    void loginUserChecksPasswordAndReturnsToken() {
        User user = new User();
        user.setUsername("john");
        user.setPassword("hashed-password");
        user.setRole(Role.USER);

        LoginRequest request = new LoginRequest("john", "123");

        when(userRepository.findByUsername("john")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("123", "hashed-password")).thenReturn(true);
        when(jwtService.generateToken(user)).thenReturn("user-token");

        AuthResponse response = authService.login(request);

        assertThat(response.getToken()).isEqualTo("user-token");
    }
}
