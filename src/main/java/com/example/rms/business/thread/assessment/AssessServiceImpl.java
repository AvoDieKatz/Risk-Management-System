package com.example.rms.business.thread.assessment;

import com.example.rms.business.auth.AuthenticationService;
import com.example.rms.business.thread.assessment.likelihood.LikelihoodProjection;
import com.example.rms.business.thread.assessment.severity.SeverityProjection;
import com.example.rms.business.thread.thread.Thread;
import com.example.rms.business.thread.assessment.likelihood.Likelihood;
import com.example.rms.business.thread.assessment.likelihood.LikelihoodRepository;
import com.example.rms.business.thread.assessment.severity.Severity;
import com.example.rms.business.thread.assessment.severity.SeverityRepository;
import com.example.rms.exceptions.InvalidRequestBodyException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class AssessServiceImpl implements AssessService {

    private AuthenticationService authenticationService;
    private LikelihoodRepository likelihoodRepository;
    private SeverityRepository severityRepository;

    @Override
    public <Type> Type performAssess(byte value, Thread thread, Class<Type> classType) {
        if (1 > value || value > 5) {
//            throw new InvalidRequestBodyException(List.of("Value should range from 1-5"));
            throw new InvalidRequestBodyException((HashMap<String, String>) Map.of("assessment", "Value should range from 1-5."));
        }

        try {
            Type obj = classType.getDeclaredConstructor().newInstance();

            if (obj instanceof Likelihood likelihood) {
                likelihood.setLikelihood(value);
                likelihood.setThread(thread);
                likelihood.setAssessor(authenticationService.getAuthenticatedUser());
                likelihoodRepository.save(likelihood);
                return obj;
            } else if (obj instanceof Severity severity) {
                severity.setSeverity(value);
                severity.setThread(thread);
                severity.setAssessor(authenticationService.getAuthenticatedUser());
                severityRepository.save(severity);
                return obj;
            }
            return null;

        } catch (
                NoSuchMethodException |
                InvocationTargetException |
                InstantiationException |
                IllegalAccessException exception) {
            throw new RuntimeException("Error while performing assessment.");
        }
    }

    @Override
    public List<LikelihoodProjection> getThreadLikelihoodInLast7Days(int threadId) {
        return likelihoodRepository.findThreadLikelihoodInLast7Days(threadId);
    }

    @Override
    public List<SeverityProjection> getThreadSeverityInLast7Days(int threadId) {
        return severityRepository.findThreadSeverityInLast7Days(threadId);
    }
}
