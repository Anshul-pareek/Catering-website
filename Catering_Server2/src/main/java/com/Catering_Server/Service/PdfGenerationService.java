package com.Catering_Server.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;

import jakarta.mail.MessagingException;

@Service
public class PdfGenerationService {

    @Autowired
    private EmailSenderService emailSenderService;

    public byte[] generatePdfFromHtmlTemplate(String email, String htmlContent) throws IOException, MessagingException {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
             PdfWriter writer = new PdfWriter(outputStream)) {
            PdfDocument pdfDocument = new PdfDocument(writer);
            ConverterProperties converterProperties = new ConverterProperties();
            HtmlConverter.convertToPdf(htmlContent, pdfDocument, converterProperties);

            byte[] pdfBytes = outputStream.toByteArray();

            // Call EmailSenderService to send the PDF via email
            try {
                emailSenderService.sendEmailWithAttachment(
                        email,
                        "Order Summary",
                        "Please find attached the order summary PDF.",
                        pdfBytes,
                        "OrderSummary.pdf"
                );
            } catch (MessagingException e) {
                // Log or handle the exception appropriately
                throw e;
            }

            return pdfBytes;

        } catch (IOException e) {
            throw e;
        }
    }
}
