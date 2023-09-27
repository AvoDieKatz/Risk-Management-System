package com.example.rms.validators;

import com.example.rms.annotations.Adult;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class DobValidator implements ConstraintValidator<Adult, LocalDate> {

    @Override
    public void initialize(Adult constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // Null values should be handled by @NotNull or @NotEmpty annotations
        }

        LocalDate now = LocalDate.now();
        LocalDate minDate = now.minusYears(18);

        return value.isBefore(minDate);
    }
}
