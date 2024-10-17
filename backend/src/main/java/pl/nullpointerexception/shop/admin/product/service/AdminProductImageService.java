package pl.nullpointerexception.shop.admin.product.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class AdminProductImageService {
	
	private final String uploadDir;
	
	public AdminProductImageService(@Value("${app.upload-dir}") String uploadDir) {
		this.uploadDir = uploadDir;
	}
	
	public String uploadImage(String filename, InputStream inputStream) {
		String slugifiedFileName = UploadedFilesNameUtils.slugifyFileName(filename);
		String newFileName = ExistingFileRenameUtils.renameIfExist(Path.of(uploadDir), slugifiedFileName);
		Path filePath = Paths.get(uploadDir).resolve(newFileName);
		
		try(OutputStream outputStream = Files.newOutputStream(filePath)) {
			inputStream.transferTo(outputStream);
			
		} catch (IOException e) {
			throw new RuntimeException("I can't write file", e);
		}
		
		return newFileName;
	}
	
	public Resource getFile(String fileName) {
		FileSystemResourceLoader fileSystemResourceLoader = new FileSystemResourceLoader();
		return fileSystemResourceLoader.getResource(uploadDir + fileName);
	}
}
