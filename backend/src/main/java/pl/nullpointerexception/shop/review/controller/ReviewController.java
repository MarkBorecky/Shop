package pl.nullpointerexception.shop.review.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
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

    @PostMapping("/reviews/{productId}")
    public Review addReview(@RequestBody @Valid ReviewDto reviewDto, @PathVariable Long productId) {
        return reviewService.addReview(Review.builder()
                        .authorName(cleanContent(reviewDto.authorName()))
                        .content(cleanContent(reviewDto.content()))
                        .productId(productId)
                .build());
    }

    private static String cleanContent(String reviewDto) {
        return Jsoup.clean(reviewDto, Safelist.none());
    }
}
