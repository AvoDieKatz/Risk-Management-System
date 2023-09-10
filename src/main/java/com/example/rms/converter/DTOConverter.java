package com.example.rms.converter;

import org.springframework.beans.BeanUtils;

import java.lang.reflect.InvocationTargetException;

public class DTOConverter {
    public static <T, D> D convertToDTO(T entity, Class<D> dtoClass) {
        try {
            D dto = dtoClass.getDeclaredConstructor().newInstance();
            BeanUtils.copyProperties(entity, dto);
            return dto;
        } catch (InstantiationException |
                 IllegalAccessException |
                 NoSuchMethodException |
                 InvocationTargetException ex) {
            throw new RuntimeException("Error while converting entity to DTO", ex);
        }
    }
}
