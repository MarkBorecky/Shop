package pl.nullpointerexception.shop.review.reposiotry;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.nullpointerexception.shop.review.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
