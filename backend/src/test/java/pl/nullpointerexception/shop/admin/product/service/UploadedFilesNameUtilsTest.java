package pl.nullpointerexception.shop.admin.product.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;


class UploadedFilesNameUtilsTest {
	
	@ParameterizedTest
	@CsvSource({
			"test test.png, test-test.png",
			"ąęśćżźół.png, aesczzol.png",
			"Product 1.png, product-1.png",
	})
	void shouldSlugifyFileName(String input, String expected) {
		Assertions.assertThat(UploadedFilesNameUtils.slugifyFileName(input)).isEqualTo(expected);
	}
	
}