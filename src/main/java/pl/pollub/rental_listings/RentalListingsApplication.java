package pl.pollub.rental_listings;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class RentalListingsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentalListingsApplication.class, args);
	}
}