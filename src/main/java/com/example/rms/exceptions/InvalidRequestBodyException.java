package com.example.rms.exceptions;

import lombok.RequiredArgsConstructor;

import java.io.Serial;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class InvalidRequestBodyException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    private List<String> errors;

    public InvalidRequestBodyException(List<String> errors) {
        this.errors = errors;
    }

    public List<String> getErrors() {
        return this.errors;
    }

    public int getTotalErrors() {
        return this.errors.size();
    }

}
