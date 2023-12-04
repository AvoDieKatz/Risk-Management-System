package com.example.rms.exceptions;

import lombok.RequiredArgsConstructor;

import java.io.Serial;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class InvalidRequestBodyException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    private Map<String, String> errors;

    public InvalidRequestBodyException(Map<String, String> errors) {
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return this.errors;
    }

    public int getTotalErrors() {
        return this.errors.size();
    }

}
