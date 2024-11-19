package com.example.mid_project.adminpack;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class adminDocService {




        @Autowired
        private adminDocumentRepository documentRepository;

        public adminHome saveDocument(MultipartFile file) throws IOException {
            adminHome document = new adminHome();
            document.setFilename(file.getOriginalFilename());
            document.setFileData(file.getBytes());
            return documentRepository.save(document);
        }
        public List<adminHome> getUserDocuments() {
            return documentRepository.findAll();
        }

    public Optional<adminHome> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }

}
