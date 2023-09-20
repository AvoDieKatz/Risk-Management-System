package com.example.rms.business.thread.thread.dto;

import com.example.rms.business.thread.category.Category;
import com.example.rms.business.thread.thread.Thread;
import com.example.rms.business.thread.thread.ThreadStatus;
import com.example.rms.user.User;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data
public class ThreadDTO {
    private Integer id;
    private String title;
    private String description;
    private ThreadStatus status;

    private CompactCategory category;
    private CompactUser author;
    private CompactUser riskOwner;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ThreadDTO(Thread thread) {
        this.id = thread.getId();
        this.title = thread.getTitle();
        this.description = thread.getDescription();
        this.status = thread.getStatus();
        this.category = new CompactCategory(thread.getCategory());
        this.author = new CompactUser(thread.getAuthor());
        this.riskOwner = new CompactUser(thread.getRiskOwner());
        this.createdAt = thread.getCreatedAt();
        this.updatedAt = thread.getUpdatedAt();
    }

    @Getter
    private class CompactCategory {
        private final Integer id;
        private final String name;
        public CompactCategory(Category category) {
            this.id = category.getId();
            this.name = category.getName();
        }
    }

    @Getter
    private class CompactUser {
        private final Integer id;
        private final String name;

        public CompactUser(User author) {
            this.id = author.getId();
            this.name = author.getFirstName() + " " + author.getLastName();
        }
    }



}
