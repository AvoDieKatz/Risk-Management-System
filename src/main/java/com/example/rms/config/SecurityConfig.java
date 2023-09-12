package com.example.rms.config;

import com.example.rms.jwt.JwtAuthEntryPoint;
import com.example.rms.jwt.JwtAuthenticationFilter;
import com.example.rms.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final AuthenticationProvider authProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthEntryPoint authEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable).exceptionHandling(ex ->
                    ex.authenticationEntryPoint(authEntryPoint)
                )
                .authorizeHttpRequests((request) -> request.requestMatchers(antMatcher("/api/auth/**")).permitAll()
                        .requestMatchers(antMatcher("/api/**")).hasRole(Role.ADMIN.name())
//                        .requestMatchers(antMatcher("/api/admin/**")).hasRole(Role.ADMIN.name())
//                        .requestMatchers(antMatcher("/api/analyst/**")).hasRole(Role.ADMIN.name())
//                        .requestMatchers(antMatcher("/api/thread/**")).hasRole(Role.ADMIN.name())

                        // Not working due to some severe Security 3 bug that I forgot which
//                        .requestMatchers("/api/admin/**").hasRole(Role.ADMIN.name())
//                        .requestMatchers("/api/analyst/**").hasRole(Role.ANALYST.name())
                        .anyRequest().denyAll())
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}
