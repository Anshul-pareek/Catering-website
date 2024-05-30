package com.Catering_Server.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "Cart")
public class Cart {

    public Cart(Long cart_id, List<Items> items) {
		super();
		this.cart_id = cart_id;
		this.items = items;
	}

	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getCart_id() {
		return cart_id;
	}

	public void setCart_id(Long cart_id) {
		this.cart_id = cart_id;
	}

	public List<Items> getItems() {
		return items;
	}

	public void setItems(List<Items> items) {
		this.items = items;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cart_id;

    @OneToMany(fetch= FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Items> items;

    
}
