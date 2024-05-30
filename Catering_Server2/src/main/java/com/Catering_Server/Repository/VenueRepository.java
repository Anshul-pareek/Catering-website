package com.Catering_Server.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Catering_Server.Entity.Venue;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Integer>{

}