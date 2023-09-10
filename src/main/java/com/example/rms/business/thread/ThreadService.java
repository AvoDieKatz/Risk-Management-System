package com.example.rms.business.thread;

import com.example.rms.business.thread.likelihood.Likelihood;
import com.example.rms.business.thread.likelihood.LikelihoodRepository;
import com.example.rms.business.thread.request.CreateThreadRequest;
import com.example.rms.business.thread.severity.Severity;
import com.example.rms.business.thread.severity.SeverityRepository;
import com.example.rms.user.User;
import com.example.rms.user.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ThreadService {

    private final ThreadRepository threadRepository;
    private final LikelihoodRepository likelihoodRepository;
    private final SeverityRepository severityRepository;
    private final UserServiceImpl userService;

    public List<Thread> getAllThreads() {
        return threadRepository.findAll();
    }

    public Thread createThread(CreateThreadRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User requesttingUser = userService.getUserBy(authentication.getName());

        Thread newThread = Thread.builder()
                .title(request.title())
                .description(request.description())
                .category(request.category())
                .author(requesttingUser)
                .riskOwner(requesttingUser)
                .status(ThreadStatus.IDENTIFIED)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        threadRepository.save(newThread);

        likelihoodRepository.save(new Likelihood(
                newThread,
                request.likelihoodValue(),
                requesttingUser
        ));

        severityRepository.save(new Severity(
                newThread,
                request.severityValue(),
                requesttingUser
        ));

        return newThread;
    }

}
