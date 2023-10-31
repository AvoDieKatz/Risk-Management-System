package com.example.rms.exceptions;

import lombok.RequiredArgsConstructor;

import java.io.Serial;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
public class InvalidRequestBodyException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    private HashMap<String, String> errors;

    public InvalidRequestBodyException(HashMap<String, String> errors) {
        this.errors = errors;
    }

    public HashMap<String, String> getErrors() {
        return this.errors;
    }

    public int getTotalErrors() {
        return this.errors.size();
    }

}
