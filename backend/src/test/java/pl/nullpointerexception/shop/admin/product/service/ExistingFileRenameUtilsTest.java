package pl.nullpointerexception.shop.admin.product.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;


class ExistingFileRenameUtilsTest {
	
	@Test
	void shouldNotRenameExistingFile(@TempDir Path tempDir) {
		// given
		
		// when
		String newName = ExistingFileRenameUtils.renameIfExist(tempDir, "test.txt");
		
		// then
		assertThat(newName).isEqualTo("test.txt");
	}
	
	@Test
	void shouldRenameExistingFile(@TempDir Path tempDir) throws IOException {
		// given
		Files.createFile(tempDir.resolve("test.txt"));
		
		// when
		String newName = ExistingFileRenameUtils.renameIfExist(tempDir, "test.txt");
		
		// then
		assertThat(newName).isEqualTo("test-1.txt");
	}
	
	@Test
	void shouldRenameManyExistingFile(@TempDir Path tempDir) throws IOException {
		// given
		Files.createFile(tempDir.resolve("test.txt"));
		Files.createFile(tempDir.resolve("test-1.txt"));
		Files.createFile(tempDir.resolve("test-2.txt"));
		Files.createFile(tempDir.resolve("test-3.txt"));
		
		// when
		String newName = ExistingFileRenameUtils.renameIfExist(tempDir, "test.txt");
		
		// then
		assertThat(newName).isEqualTo("test-4.txt");
	}
	
}