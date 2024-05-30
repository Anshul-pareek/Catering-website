package com.Catering_Server.Service;

import com.Catering_Server.Entity.Cart;
import com.Catering_Server.Entity.Items;
import com.Catering_Server.Repository.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private ItemsService itemsService;

    public Cart createCart() {
        // Create a new cart instance
        Cart cart = new Cart();
        
        // Save the cart in the database
        return cartRepository.save(cart);
    }

    public void addItemToCart(Long cartId, Long itemId) throws NotFoundException {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));

        // Retrieve item details using the ItemsService
        Items item = itemsService.getItemById(itemId);

        // Add item to the cart
        cart.getItems().add(item);
        cartRepository.save(cart);
    }

    public Cart getCartById(Long cartId) {
        return cartRepository.findById(cartId).orElse(null);
    }
}