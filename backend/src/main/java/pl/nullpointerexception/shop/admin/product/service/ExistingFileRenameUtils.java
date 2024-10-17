package pl.nullpointerexception.shop.admin.product.service;

import org.apache.commons.io.FilenameUtils;

import java.nio.file.Files;
import java.nio.file.Path;

public class ExistingFileRenameUtils {
	public static String renameIfExist(Path uploadDir, String fileName) {
		if (Files.notExists(uploadDir.resolve(fileName))) {
			return fileName;
		}
		String newFileName = changeName(fileName);
		return renameIfExist(uploadDir, newFileName);
	}
	
	private static String changeName(String fileName) {
		String[] split = FilenameUtils.getBaseName(fileName).split("-(?=[\\d]+$)");
		String root = split[0];
		int counter = split.length > 1 ? Integer.parseInt(split[1]) + 1 : 1;
		return "%1$s-%2$d.%3$s".formatted(root, counter, FilenameUtils.getExtension(fileName));
	}
}
