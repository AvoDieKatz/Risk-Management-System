package com.example.rms.exceptions;

import java.io.Serial;

public class ForbiddenActionException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public ForbiddenActionException(String message) {
        super(message);
    }
}
