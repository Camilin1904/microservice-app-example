package com.elgris.usersapi.service;

import com.elgris.usersapi.models.User;
import com.elgris.usersapi.repository.UserRepository;
import com.google.common.util.concurrent.RateLimiter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final RateLimiter rateLimiter = RateLimiter.create(5.0);

    @Retryable(
            value = { RuntimeException.class },
            maxAttempts = 4,
            backoff = @Backoff(delay = 3000)
    )
    public List<User> getAllUsers() {

        if (!rateLimiter.tryAcquire()) {
            throw new RuntimeException("Rate limit exceeded. Try again later.");
        }
        List<User> users = new LinkedList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    @Retryable(
            value = { RuntimeException.class },
            maxAttempts = 4,
            backoff = @Backoff(delay = 3000)
    )
    public User getUserByUsername(String username) {
        if (!rateLimiter.tryAcquire()) {
            throw new RuntimeException("Rate limit exceeded. Try again later.");
        }
        return userRepository.findOneByUsername(username);
    }
}
