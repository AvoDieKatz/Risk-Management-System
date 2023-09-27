package com.example.rms.business.thread.assessment;

import com.example.rms.business.thread.thread.Thread;

import java.lang.reflect.InvocationTargetException;

public interface AssessService {
    <Type> Type performAssess(byte value, Thread thread, Class<Type> classType)
            throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException;
}
