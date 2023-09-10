package com.example.rms.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(InvalidRequestBodyException.class)
    public ResponseEntity<ErrorObject> InvalidRequestBodyExceptionHandler(InvalidRequestBodyException ex, HttpServletRequest request) {
        return new ResponseEntity<>(
                new ErrorObject(
                        ex.getErrors(),
                        "There is " + ex.getTotalErrors() + " error.",
                        HttpStatus.BAD_REQUEST.value(),
                        new Date(),
                        request.getRequestURI()
                ), HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorObject> ResourceNotFoundExceptionHandler(ResourceNotFoundException ex, HttpServletRequest request) {
        return new ResponseEntity<>(
                new ErrorObject(
                        ex.getMessage(),
                        HttpStatus.NOT_FOUND.value(),
                        new Date(),
                        request.getRequestURI()
                ), HttpStatus.NOT_FOUND
        );
    }
}
