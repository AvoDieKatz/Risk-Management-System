package com.example.rms.annotations;

import com.example.rms.validators.EnumGenderPatternValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = EnumGenderPatternValidator.class)
public @interface EnumGenderPattern {
    String message() default "Invalid gender.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
