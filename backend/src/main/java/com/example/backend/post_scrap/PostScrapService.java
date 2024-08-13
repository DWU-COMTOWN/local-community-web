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
    public PostScrap scrapPost(Long userId, Long postId) {
        Optional<PostScrap> existingScrap = postScrapRepository.findByUserIdAndPostId(userId, postId);

        if (existingScrap.isPresent()) {
            throw new IllegalStateException("Already scrapped.");
        } else {
            User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
            Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
            PostScrap newScrap = new PostScrap(user, post);
            return postScrapRepository.save(newScrap);
        }
    }

    @Transactional
    public void unscrapPost(Long userId, Long postId) {
        Optional<PostScrap> existingScrap = postScrapRepository.findByUserIdAndPostId(userId, postId);

        if (existingScrap.isPresent()) {
            postScrapRepository.deleteByUserIdAndPostId(userId, postId);
        } else {
            throw new IllegalStateException("No scrap found to remove.");
        }
    }
    public boolean isScrapped(Long userId, Long postId) {
        return postScrapRepository.findByUserIdAndPostId(userId, postId).isPresent();
    }

}
