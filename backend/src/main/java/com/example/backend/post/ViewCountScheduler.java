package com.example.backend.post;

import com.example.backend.config.RedisDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Component
public class ViewCountScheduler {

    @Autowired
    private final RedisDao redisDao;
    @Autowired
    private final PostRepository postRepository;

    public ViewCountScheduler(RedisDao redisDao, PostRepository postRepository) {
        this.redisDao = redisDao;
        this.postRepository = postRepository;
    }
    @Transactional
    @Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Seoul")
    public void updateViewCounts() {
        Set<String> redisKeys = redisDao.getAllKeys(); // 모든 게시물의 Redis 키 가져오기
        for (String redisKey : redisKeys) {
            String redisValue = redisDao.getValues(redisKey);
            if (redisValue != null) {
                int views = Integer.parseInt(redisValue);
                Long postId = Long.parseLong(redisKey);
                Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
                if (post != null) {
                    post.setView(views);
                    postRepository.save(post);
                }
            }
        }
    }
}
