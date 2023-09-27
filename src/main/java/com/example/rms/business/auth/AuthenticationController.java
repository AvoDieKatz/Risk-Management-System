package com.example.rms.business.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody @Valid AuthenticationRequest request
    ) {
        return new ResponseEntity<>(authenticationService.authenticate(request), HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return new ResponseEntity<>("Passed authorization", HttpStatus.OK);
    }

}
