package com.example.rms.business.thread.assessment;

import com.example.rms.business.thread.assessment.likelihood.LikelihoodProjection;
import com.example.rms.business.thread.assessment.severity.SeverityProjection;
import com.example.rms.business.thread.thread.Thread;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public interface AssessService {
    <Type> Type performAssess(byte value, Thread thread, Class<Type> classType)
            throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException;

    List<LikelihoodProjection> getThreadLikelihoodInLast7Days(int threadId);

    List<SeverityProjection> getThreadSeverityInLast7Days(int threadId);
}
