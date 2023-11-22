package com.example.rms.exceptions;

import lombok.Data;

import java.util.*;

@Data
public class ErrorObject {

    private List<String> errors;
    private HashMap<String, String> errorsMap;
    private String message;
    private Integer status;
    private Date timestamp;
    private String path;

    public ErrorObject(List<String> errors, String message, Integer status, Date timestamp, String path) {
        this.errors = errors;
        this.message = message;
        this.status = status;
        this.timestamp = timestamp;
        this.path = path;
    }

    public ErrorObject(HashMap<String, String> errorsMap, String message, Integer status, Date timestamp, String path) {
        this.errorsMap = errorsMap;
        this.message = message;
        this.status = status;
        this.timestamp = timestamp;
        this.path = path;
    }

    public ErrorObject(String message, Integer status, Date timestamp, String path) {
        this.errors = List.of(message);
        this.message = message;
        this.status = status;
        this.timestamp = timestamp;
        this.path = path;
    }
}
