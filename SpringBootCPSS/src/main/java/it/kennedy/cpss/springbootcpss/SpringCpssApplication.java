package it.kennedy.cpss.springbootcpss;

import java.util.logging.Logger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringCpssApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringCpssApplication.class, args);
		Logger logger = Logger.getLogger(SpringCpssApplication.class.getName());
		logger.info("\n-------------------------------------------------------------------------------------------------------------------------------------------------");
	}

}
