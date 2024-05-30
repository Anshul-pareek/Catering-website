//package com.Catering_Server.Controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.Catering_Server.Entity.Admin;
//import com.Catering_Server.Service.AdminService;
//
//@RestController
//@CrossOrigin("*")
//public class AdminController {
//    
//    @Autowired
//    private AdminService adminService;
//    
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder; // Inject password encoder bean
//    
//    @PostMapping("/admin/register") // Changed endpoint to "/admin/register" for registration
//    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
//        // Encrypt password before saving
//        String encryptedPassword = passwordEncoder.encode(admin.getPassword());
//        admin.setPassword(encryptedPassword);
//        Admin createdAdmin = adminService.addAdmin(admin);
//        return ResponseEntity.statf.CREATED).body(createdAdmin);
//    }
//    
//    @PostMapping("/admin/login") // New endpoint for login
//    public ResponseEntity<String> loginAdmin(@RequestBody Admin admin) {
//        // Fetch admin by email
//        Admin existingAdmin = adminService.getAdminByEmail(admin.getEmail());
//        if (existingAdmin == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//        }
//        // Verify password
//        if (passwordEncoder.matches(admin.getPassword(), existingAdmin.getPassword())) {
//            // Passwords match, return success message or JWT token
//            return ResponseEntity.ok("Login successful");
//        } else {
//            // Passwords don't match, return unauthorized status
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//        }
//    }
//}
