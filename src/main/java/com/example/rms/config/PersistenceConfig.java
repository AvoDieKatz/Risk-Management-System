package com.example.rms.config;

import com.example.rms.user.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
public class PersistenceConfig {

    @Bean
    public AuditorAware<User> auditorProvider() {
        return new AuditorAwareImpl();
    }

    public static class AuditorAwareImpl implements AuditorAware<User> {
        @Override
        public Optional<User> getCurrentAuditor() {
            return Optional.ofNullable(SecurityContextHolder.getContext())
                    .map(SecurityContext::getAuthentication)
                    .filter(Authentication::isAuthenticated)
                    .map(Authentication::getPrincipal)
                    .map(User.class::cast);
        }
    }
}
