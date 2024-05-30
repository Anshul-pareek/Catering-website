package com.Catering_Server.Controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Catering_Server.Service.PdfGenerationService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/pdf")
public class PdfController {

    @Autowired
    private PdfGenerationService pdfGenerationService;

    @PostMapping("/generateAndSend")
    public ResponseEntity<String> generateAndSendPdf(@RequestBody Map<String, Object> request) throws MessagingException {
        String email = (String) request.get("email");
        String htmlContent = (String) request.get("htmlContent");
        try {
            pdfGenerationService.generatePdfFromHtmlTemplate(email, htmlContent);
            return ResponseEntity.ok().body("PDF generated and sent successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to generate and send PDF.");
        }
    }
}
