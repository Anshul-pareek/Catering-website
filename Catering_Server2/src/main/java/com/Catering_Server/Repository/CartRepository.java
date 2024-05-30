package com.Catering_Server.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Catering_Server.Entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
