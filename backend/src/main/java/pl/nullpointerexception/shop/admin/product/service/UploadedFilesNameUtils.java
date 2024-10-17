package pl.nullpointerexception.shop.admin.product.service;

import com.github.slugify.Slugify;
import org.apache.commons.io.FilenameUtils;

import java.util.Map;

public class UploadedFilesNameUtils {
	
	private static final Slugify slugify = Slugify.builder()
			.customReplacements(Map.of("ł", "l"))
			.build();
	
	public static String slugifyFileName(String filename) {
		String baseName = FilenameUtils.getBaseName(filename);
		String slugName = slugify.slugify(baseName);
		
		String extension = FilenameUtils.getExtension(filename);
		
		return slugName + "." + extension;
	}
}
