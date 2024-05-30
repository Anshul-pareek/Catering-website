package com.Catering_Server.Controller;

import com.Catering_Server.Entity.Cart;
import com.Catering_Server.Entity.Items;
import com.Catering_Server.Service.CartService;
import com.Catering_Server.Service.ItemsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {

	  @Autowired
	    private CartService cartService;

	    @Autowired
	    private ItemsService itemService; // Assuming you have an ItemService

	   
	        // POST mapping to create a new cart
	        @PostMapping("/createCart")
	        public ResponseEntity<Cart> createCart() {
	            try {
	                // Create a new cart
	                Cart cart = cartService.createCart();

	                return ResponseEntity.status(HttpStatus.CREATED).body(cart);
	            } catch (Exception e) {
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	            }
	        }

	        // POST mapping to add an item to a cart
	     // POST mapping to add an item to a cart
	        @PostMapping("/{cartId}/addItem")
	        public ResponseEntity<Cart> addItemToCart(@PathVariable Long cartId, @RequestParam Long item_id) {
	            try {
	                // Add item to the specified cart
	                cartService.addItemToCart(cartId, item_id);

	                // Retrieve and return the updated cart
	                Cart cart = cartService.getCartById(cartId);
	                return ResponseEntity.ok(cart);
	            } catch (Exception e) {
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	            }
	        }

	        // GET mapping to retrieve a cart by its ID
	        @GetMapping("/{cartId}")
	        public ResponseEntity<Cart> getCartById(@PathVariable Long cartId) {
	            try {
	                // Retrieve cart by ID
	                Cart cart = cartService.getCartById(cartId);

	                if (cart != null) {
	                    return ResponseEntity.ok(cart);
	                } else {
	                    return ResponseEntity.notFound().build();
	                }
	            } catch (Exception e) {
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	            }
	        }
	    }
