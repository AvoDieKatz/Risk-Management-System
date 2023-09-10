package com.example.rms.business.thread.request;

import com.example.rms.business.category.Category;

public record CreateThreadRequest(
    String title,
    Category category,
    String description,
    Byte likelihoodValue,
    Byte severityValue
) {

}
