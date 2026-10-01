package com.codepathacademy.service;

import com.codepathacademy.dto.request.LoginRequest;
import com.codepathacademy.dto.request.RefreshTokenRequest;
import com.codepathacademy.dto.request.RegisterRequest;
import com.codepathacademy.dto.response.AuthResponse;
import com.codepathacademy.dto.response.UserProfileResponse;
import com.codepathacademy.entity.Role;
import com.codepathacademy.entity.User;
import com.codepathacademy.exception.BadRequestException;
import com.codepathacademy.exception.DuplicateResourceException;
import com.codepathacademy.exception.ResourceNotFoundException;
import com.codepathacademy.exception.UnauthorizedException;
import com.codepathacademy.repository.UserRepository;
import com.codepathacademy.security.CustomUserPrincipal;
import com.codepathacademy.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final GamificationService gamificationService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (request.getConfirmPassword() != null && !request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username '" + request.getUsername() + "' is already taken");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email '" + request.getEmail() + "' is already registered");
        }

        User user = User.builder()
                .fullName(request.getFullName().trim())
                .username(request.getUsername().trim().toLowerCase())
                .email(request.getEmail().trim().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .xp(50) // Welcome XP
                .level("Beginner")
                .streakDays(1)
                .lastActiveDate(LocalDate.now())
                .learningHours(0.0)
                .build();

        user = userRepository.save(user);
        logger.info("New user registered: {}", user.getUsername());

        CustomUserPrincipal principal = new CustomUserPrincipal(user);
        String accessToken = jwtService.generateToken(principal);
        String refreshToken = jwtService.generateRefreshToken(principal);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(mapToProfileResponse(user))
                .build();
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsernameOrEmail().trim().toLowerCase(),
                        request.getPassword()
                )
        );

        CustomUserPrincipal principal = (CustomUserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        gamificationService.updateDailyStreak(user);
        userRepository.save(user);

        String accessToken = jwtService.generateToken(principal);
        String refreshToken = jwtService.generateRefreshToken(principal);

        logger.info("User logged in: {}", user.getUsername());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(mapToProfileResponse(user))
                .build();
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        if (!jwtService.validateToken(request.getRefreshToken())) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        String username = jwtService.extractUsername(request.getRefreshToken());
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CustomUserPrincipal principal = new CustomUserPrincipal(user);
        String newAccessToken = jwtService.generateToken(principal);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(request.getRefreshToken())
                .user(mapToProfileResponse(user))
                .build();
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getCurrentUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
        return mapToProfileResponse(user);
    }

    @Transactional
    public UserProfileResponse updateProfile(String username, String fullName) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
        if (fullName != null && !fullName.isBlank()) {
            user.setFullName(fullName.trim());
        }
        user = userRepository.save(user);
        return mapToProfileResponse(user);
    }

    public UserProfileResponse mapToProfileResponse(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .xp(user.getXp())
                .level(user.getLevel())
                .streakDays(user.getStreakDays())
                .learningHours(user.getLearningHours())
                .lastActiveDate(user.getLastActiveDate())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
