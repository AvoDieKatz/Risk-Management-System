package com.example.rms.validators;

import com.example.rms.annotations.EnumGenderPattern;
import com.example.rms.user.Gender;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

public class EnumGenderPatternValidator implements ConstraintValidator<EnumGenderPattern, Enum<?>> {
    private Pattern pattern;

    @Override
    public void initialize(EnumGenderPattern constraintAnnotation) {
        System.out.println("Gender Validator INIT");
        try {
            pattern = Pattern.compile("^(?! )(MALE|FEMALE|OTHERS)(?<! )$");
        } catch (PatternSyntaxException ex) {
            throw new IllegalArgumentException("Given regex is invalid", ex);
        }
//        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Enum value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        System.out.println("VALUE = " + value);
        System.out.println("VALUE NAME = " + value.name());

        Matcher matcher = pattern.matcher(value.name());

        System.out.println("MATCHES = " + matcher);
        return matcher.matches();
    }
}
