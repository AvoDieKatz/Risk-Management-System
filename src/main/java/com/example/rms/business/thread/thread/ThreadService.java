package com.example.rms.business.thread.thread;

import com.example.rms.business.thread.assessment.AssessmentDTO;
import com.example.rms.business.thread.assessment.AssessmentRequest;
import com.example.rms.business.thread.thread.dto.ThreadDTO;
import com.example.rms.business.thread.thread.dto.ThreadCompactProjection;
import com.example.rms.business.thread.thread.dto.ThreadRequest;
import com.example.rms.business.thread.feedback.ThreadFeedbackDTO;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public interface ThreadService {

    // Analyst methods
    List<ThreadCompactProjection> getThreads(ThreadStatus status);
    ThreadCompactProjection getThreadDetail(int threadId);
    List<ThreadCompactProjection> getPersonalThreads();


    ThreadDTO createThread(ThreadRequest request);

    // This method only update the CONTENT of the Thread, it does not contain the Risk Assessment(Likelihood, Severity)
    ThreadDTO updateThread(int threadId, ThreadRequest request);
    void deleteThread(int threadId);
    AssessmentDTO assessThread(int threadId, AssessmentRequest request) throws InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException;


    // Manager methods
    ThreadDTO updateThreadStatus(int threadId, ThreadStatus status);

    void reviewThread(int threadId, ThreadFeedbackDTO request);

    ThreadDTO assignRiskOwner(int threadId, int newOwnerId);

}
