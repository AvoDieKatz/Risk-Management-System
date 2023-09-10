package com.example.rms.jwt;

import com.example.rms.exceptions.ErrorObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        final String expiredMsg = (String) request.getAttribute("expired");

        String errorMessage = (expiredMsg != null) ? expiredMsg : authException.getMessage();

        response.setContentType(MediaType.APPLICATION_JSON.toString());
        ErrorObject errorObject = new ErrorObject(
                errorMessage,
                HttpStatus.UNAUTHORIZED.value(),
                new Date(),
                request.getRequestURI()
        );
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorObject));
    }
}
