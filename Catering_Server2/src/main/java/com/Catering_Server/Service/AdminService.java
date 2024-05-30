//package com.Catering_Server.Service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.Catering_Server.Entity.Admin;
//import com.Catering_Server.Repository.AdminRepository;
//
//@Service
//public class AdminService {
//    
//    @Autowired
//    private AdminRepository adminRepository;
//
//    public Admin addAdmin(Admin admin) {
//        return adminRepository.save(admin);
//    }
//    
//    public Admin getAdminByEmail(String email) {
//        return adminRepository.findByEmail(email);
//    }
//}
