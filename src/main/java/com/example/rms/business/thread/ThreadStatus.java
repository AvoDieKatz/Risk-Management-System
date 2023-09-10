package com.example.rms.business.thread;

public enum ThreadStatus {
    IDENTIFIED, // Submitted and waiting for approval from Risk Manager
    ACTIVE, // Approved by Risk Manager and actively monitoring
    REJECTED, // Disapproved by Risk Manager and put into archive
    RESOLVED // Action taken by CRO and being monitoring afterward
}
