package com.example.mid_project.adminpack;


import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/documents")
public class documentController {
    @Autowired
    private adminDocService documentService;

    @PostMapping("/upload")
    public String uploadDocument(@RequestParam("file") MultipartFile file) {
        try {
            documentService.saveDocument(file);
            return "File uploaded successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed!";
        }
    }


    @GetMapping("/list")
    public ResponseEntity<List<adminHome>> getDocuments() {
        List<adminHome> documents = documentService.getUserDocuments();
        // Set the fileData field to null to avoid sending file content
        documents.forEach(doc -> doc.setFileData(null));
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long id) {
        Optional<adminHome> documentOptional = documentService.getDocumentById(id);

        if (documentOptional.isPresent()) {
            adminHome document = documentOptional.get();

            // Return the file with proper headers
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getFilename() + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")  // You can modify the content type if necessary
                    .body(document.getFileData());
        } else {
            // If the document is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



}
