package pl.nullpointerexception.shop.review.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.nullpointerexception.shop.review.model.Review;
import pl.nullpointerexception.shop.review.reposiotry.ReviewRepository;

@Service
@AllArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }
}
