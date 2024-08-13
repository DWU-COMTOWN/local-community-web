package com.example.backend.post;

import com.example.backend.category.Category;
import com.example.backend.category.CategoryRepository;
import com.example.backend.comment.Comment;
import com.example.backend.comment.CommentRepository;
import com.example.backend.comment.CommentResponse;
import com.example.backend.config.S3Service;
import com.example.backend.post_image.PostImage;
import com.example.backend.post_image.PostImageRepository;
import com.example.backend.post_image.PostImageResponse;
import com.example.backend.post_like.PostLikeRepository;
import com.example.backend.post_like.PostLikeService;
import com.example.backend.post_scrap.PostScrapService;
import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private PostLikeRepository postLikeRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostImageRepository postImageRepository;
    @Autowired
    private S3Service s3Service;
    @Autowired
    private PostLikeService postLikeService;
    @Autowired
    private PostScrapService postScrapService;

    public PostResponse createPost(PostRequest postRequest, List<MultipartFile> imageFiles) throws IOException {
        // 아직 유저 연결 X -> 임시로 1L로 설정
        // User user = userRepository.findById(postRequest.getUserId()).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        User user = userRepository.findById(1L).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Category category = categoryRepository.findById(postRequest.getCategoryId()).orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));
        Post post = new Post(postRequest.getTitle(), postRequest.getContent(), user, category);
        Post savedPost = postRepository.save(post);

        // 이미지 업로드
        List<PostImageResponse> imageResponses = new ArrayList<>();
        if(imageFiles != null) {
            for (MultipartFile file : imageFiles) {
                try {
                    String imageUrl = s3Service.upload(file, "post");
                    PostImage postImage = new PostImage(imageUrl, savedPost);
                    postImageRepository.save(postImage); // 이미지 저장
                    imageResponses.add(new PostImageResponse(imageUrl)); // 업로드된 이미지 URL을 리스트에 추가
                } catch (IOException e) {
                    throw new RuntimeException("Failed to upload file to S3", e);
                }
            }
        }
        return PostResponse.toDto(savedPost, false, false,null, imageResponses);
    }

    public PostResponse getPostById(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
        Boolean isLiked = postLikeService.isLiked(userId, postId);
        Boolean isScrapped = postScrapService.isScrapped(userId, postId);

        List<PostImage> postImages = postImageRepository.findByPostId(postId);
        List<PostImageResponse> imageResponses = postImages.stream()
                .map(PostImageResponse::new)
                .collect(Collectors.toList());

        // Post에 속한 모든 댓글을 조회하여 CommentResponse로 변환하여 리스트에 추가
        List<Comment> postComments = commentRepository.findByPostIdAndParentCommentIsNull(post.getId());
        List<CommentResponse> commentResponses = new ArrayList<>();
        for (Comment comment : postComments) {
            List<Comment> replies = commentRepository.findByParentCommentId(comment.getId());
            List<CommentResponse> replyResponses = replies.stream()
                    .map(reply -> CommentResponse.toDto(reply, null))
                    .collect(Collectors.toList());
            commentResponses.add(CommentResponse.toDto(comment, replyResponses));
        }
        return PostResponse.toDto(post, isScrapped, isLiked, commentResponses, imageResponses);
    }

    @Transactional(readOnly = true)
    public Page<PostListResponse> getPostsByCategoryId(Long categoryId, Pageable pageable) {
        Page<Post> posts = postRepository.findByCategoryIdOrderByIdDesc(categoryId, pageable);
        return posts.map(PostListResponse::toDto);
    }

    @Transactional
    public Long update(Long postId, PostEditRequest postEditRequest, List<MultipartFile> imageFiles) throws Exception {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));

        // 기존에 첨부한 이미지 URL 가져오기
        List<String> currentImageUrls = post.getPostImages().stream()
                .map(PostImage::getUrl)
                .collect(Collectors.toList());

        // 기존 이미지에서 삭제된 이미지 추출
        List<String> deleteImageUrls = currentImageUrls.stream()
                .filter(url -> !postEditRequest.getCurrentImageUrls().contains(url))
                .collect(Collectors.toList());

        // 삭제된 파일을 S3와 DB에서 삭제
        deleteS3Image(deleteImageUrls);
        for (String imageUrl : deleteImageUrls) {
            PostImage postImage = postImageRepository.findByUrl(imageUrl).orElseThrow(() -> new IllegalArgumentException("Invalid PostImage url"));
            post.removePostImage(postImage);
            postImageRepository.delete(postImage);
        }

        // 새로 첨부할 이미지 URL 리스트
        if (imageFiles != null) {
            for (MultipartFile file : imageFiles) {
                // S3에 업로드하고 URL 가져오기
                String imageUrl = s3Service.upload(file, "post");
                PostImage postImage = new PostImage(imageUrl, post);
                post.addPostImage(postImage); // 새로 추가된 이미지를 Post에 추가
                postImageRepository.save(postImage); // PostImage 저장
            }
        }
        // 게시글 업데이트
        post.update(postEditRequest);
        return postId;
    }


    @Transactional
    public void delete(Long postId) throws Exception {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
        List<String> imageUrls = post.getPostImages().stream()
                .map(PostImage::getUrl)
                .collect(Collectors.toList());

        deleteS3Image(imageUrls);
        postRepository.delete(post);
    }
    @Transactional
    public void deleteS3Image(List<String> imageUrls) throws Exception {
        for (String imageUrl : imageUrls) {
            URI uri = new URI(imageUrl);
            String fileName = uri.getPath().substring(1);
            s3Service.deleteFile(fileName);
        }
    }
}