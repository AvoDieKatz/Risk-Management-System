package com.example.rms.business.thread.thread.dto;

public record ThreadRequest(
    String title,
    int categoryId,
    String description,
    byte likelihoodValue,
    byte severityValue
) {

}
