package com.example.rms.annotations;

import com.example.rms.validators.DobValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = DobValidator.class)
public @interface Adult {
    String message() default "Must be at least 18 years old.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
