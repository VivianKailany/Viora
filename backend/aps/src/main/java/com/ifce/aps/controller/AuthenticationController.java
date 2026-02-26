package com.ifce.aps.controller;

import com.ifce.aps.controller.dto.AuthenticationDTO;
import com.ifce.aps.controller.dto.LoginResponseDTO;
import com.ifce.aps.controller.dto.RegisterDTO;
import com.ifce.aps.domain.User;
import com.ifce.aps.repository.UserRepository;
import com.ifce.aps.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthenticationController(AuthenticationManager authenticationManager,
                                    UserRepository userRepository,
                                    PasswordEncoder passwordEncoder,
                                    TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        var authToken = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var authentication = authenticationManager.authenticate(authToken);

        var user = (User) authentication.getPrincipal();
        var jwt = tokenService.generateToken(user);

        return ResponseEntity.ok(new LoginResponseDTO(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO data) {

        if (userRepository.findByLoginUser(data.login()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        var user = new User();
        user.setNameUser(data.nameUser());
        user.setLoginUser(data.login());
        user.setPassword(passwordEncoder.encode(data.password()));

        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}