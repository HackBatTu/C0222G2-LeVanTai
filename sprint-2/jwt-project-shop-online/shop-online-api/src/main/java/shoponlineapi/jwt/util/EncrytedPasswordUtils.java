package shoponlineapi.jwt.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class EncrytedPasswordUtils {
    public String encrytePassword(String password){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }
//    public static void main(String[] args) {
//        String password = "";
//        String encrytedPassword = new EncrytedPasswordUtils().encrytePassword(password);
//
//        System.out.println("Encryted Password: " + encrytedPassword);
//        System.out.println(new BCryptPasswordEncoder().matches("1234", encrytedPassword));
//
//    }
}
