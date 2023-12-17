package com.example.rms.config;

import com.example.rms.jwt.JwtAuthEntryPoint;
import com.example.rms.jwt.JwtAuthenticationFilter;
import com.example.rms.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

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
        HeaderWriterLogoutHandler headerWriterLogoutHandler = new HeaderWriterLogoutHandler(
                new ClearSiteDataHeaderWriter(ClearSiteDataHeaderWriter.Directive.ALL)
        );

        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable).exceptionHandling(ex ->
                    ex.authenticationEntryPoint(authEntryPoint)
                )
                .authorizeHttpRequests((request) -> request.requestMatchers(antMatcher("/api/auth/**")).permitAll()
                        .requestMatchers(antMatcher("/websocket/**")).permitAll()
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/category/**")).authenticated()
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/thread/**")).authenticated()
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/thread")).authenticated()
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/thread/**/assess")).authenticated()
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/thread/**/assess")).authenticated()
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/thread/**/comment")).authenticated()
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/thread/**/comment")).authenticated()
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/thread/**/solution")).authenticated()
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/thread/**/solution")).authenticated()
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/thread/**/review")).authenticated()

                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/admin/user")).hasAnyRole(Role.ADMIN.name(), Role.MANAGER.name())
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/category")).hasRole(Role.MANAGER.name())
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/thread/**/review")).hasRole(Role.MANAGER.name())
                        .requestMatchers(antMatcher(HttpMethod.PUT, "/api/thread/**/owner")).hasRole(Role.MANAGER.name())
                        .requestMatchers(antMatcher(HttpMethod.PUT, "/api/thread/**/solution/choice")).hasRole(Role.OFFICER.name())

                        .requestMatchers(antMatcher("/api/admin/**")).hasRole(Role.ADMIN.name())

                        .anyRequest().denyAll())
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(
                        logout -> logout
                                .logoutUrl("/api/auth/logout")
                                .addLogoutHandler(headerWriterLogoutHandler)
                                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
                );
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}
