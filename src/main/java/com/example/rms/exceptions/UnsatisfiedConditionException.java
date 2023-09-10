package com.example.rms.exceptions;

import java.io.Serial;

public class UnsatisfiedConditionException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public UnsatisfiedConditionException(String message) {
        super(message);
    }
}
