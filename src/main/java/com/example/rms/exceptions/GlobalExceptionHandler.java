package com.example.rms.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(InvalidRequestBodyException.class)
    public ResponseEntity<ErrorObject> InvalidRequestBodyExceptionHandler(
            InvalidRequestBodyException ex,
            HttpServletRequest request
    ) {
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
    public ResponseEntity<ErrorObject> ResourceNotFoundExceptionHandler(
            ResourceNotFoundException ex,
            HttpServletRequest request
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        ex.getMessage(),
                        HttpStatus.NOT_FOUND.value(),
                        new Date(),
                        request.getRequestURI()
                ), HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(UnsatisfiedConditionException.class)
    public ResponseEntity<ErrorObject> UnsatisfiedConditionException(
            UnsatisfiedConditionException ex,
            HttpServletRequest request
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        ex.getMessage(),
                        HttpStatus.NOT_ACCEPTABLE.value(),
                        new Date(),
                        request.getRequestURI()
                ), HttpStatus.NOT_ACCEPTABLE
        );
    }

    @ExceptionHandler(ForbiddenActionException.class)
    public ResponseEntity<ErrorObject> ForbiddenActionExceptionHandler(
            ForbiddenActionException ex,
            HttpServletRequest request
    ) {
        return new ResponseEntity<>(
                new ErrorObject(
                        ex.getMessage(),
                        HttpStatus.FORBIDDEN.value(),
                        new Date(),
                        request.getRequestURI()
                ), HttpStatus.FORBIDDEN
        );
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        List<ObjectError> errors = ex.getAllErrors();

        List<String> errorMessages = new ArrayList<>();

        for (ObjectError error : errors) {
            errorMessages.add(error.getDefaultMessage());
        }

        return new ResponseEntity<>(
                new ErrorObject(
                        errorMessages,
                        errorMessages.size() + " error found.",
//                        HttpStatus.BAD_REQUEST.value(),
                        status.value(),
                        new Date(),
                        request.getContextPath()
//                        request.getRequestURI()
                ), HttpStatus.BAD_REQUEST
        );
    }
}
