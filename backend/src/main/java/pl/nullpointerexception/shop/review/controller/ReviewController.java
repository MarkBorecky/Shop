package pl.nullpointerexception.shop.review.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.nullpointerexception.shop.review.controller.dto.ReviewDto;
import pl.nullpointerexception.shop.review.model.Review;
import pl.nullpointerexception.shop.review.service.ReviewService;

@RestController
@AllArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/review/{productId}")
    public Review addReview(@RequestBody ReviewDto reviewDto, @PathVariable Long productId) {
        return reviewService.addReview(Review.builder()
                        .authorName(Jsoup.clean(reviewDto.authorName()))
                        .content(reviewDto.content())
                        .product(productId)
                .build());
    }
}
