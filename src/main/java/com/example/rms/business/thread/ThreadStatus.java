package com.example.rms.business.thread;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ThreadStatus {
    IDENTIFIED(Constant.IDENTIFIED), // Submitted and waiting for approval from Risk Manager
    ACTIVE(Constant.ACTIVE), // Approved by Risk Manager and actively monitoring
    REJECTED(Constant.REJECTED), // Disapproved by Risk Manager and put into archive
    RESOLVED(Constant.RESOLVED); // Action taken by CRO and being monitoring afterward

    private final String value;

    public static class Constant {
        public static final String IDENTIFIED = "IDENTIFIED";
        public static final String ACTIVE = "ACTIVE";
        public static final String REJECTED = "REJECTED";
        public static final String RESOLVED = "RESOLVED";
    }

}
