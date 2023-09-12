package com.example.rms.business.thread.dto;

public record ThreadRequest(
    String title,
    int categoryId,
    String description,
    Byte likelihoodValue,
    Byte severityValue
) {

}
