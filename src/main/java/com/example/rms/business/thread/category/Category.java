package com.example.rms.business.thread.category;

import com.example.rms.business.thread.thread.Thread;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

//@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_thread_category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "category_name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Thread> threads;
}
