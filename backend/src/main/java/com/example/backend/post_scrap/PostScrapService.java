package com.example.backend.post_scrap;

import com.example.backend.post.Post;
import com.example.backend.post.PostRepository;
import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostScrapService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostScrapRepository postScrapRepository;

    public int getScrapCountByPostId(Long postId) {
        return postScrapRepository.findByPostId(postId).size();
    }
    @Transactional
    public void  scrapPost(Long userId, Long postId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
        PostScrap newScrap = new PostScrap(user, post);
        postScrapRepository.save(newScrap);
    }
    @Transactional
    public void unscrapPost(Long userId, Long postId) {
        postScrapRepository.deleteByUserIdAndPostId(userId, postId);
    }
    public boolean isScrapped(Long userId, Long postId) {
        return postScrapRepository.findByUserIdAndPostId(userId, postId).isPresent();
    }

}
