package com.example.backend.post_like;


import com.example.backend.post.Post;
import com.example.backend.post.PostRepository;
import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostLikeService {
    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public int getLikeCountByPostId(Long postId) {
        return postLikeRepository.findByPostId(postId).size();
    }
//    public List<PostLike> findByUserId(Long userId) {
//        return postLikeRepository.findByUserId(userId);
//    }
    public void likePost(Long userId, Long postId) {
        //임시 설정
        User user = userRepository.findById(1L).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
        PostLike postLike = new PostLike(user, post);
        postLikeRepository.save(postLike);
    }

    public boolean isLiked(Long userId, Long postId) {
        return postLikeRepository.findByUserIdAndPostId(userId, postId).isPresent();
    }
}
