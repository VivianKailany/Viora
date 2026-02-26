package com.ifce.aps.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Table(name = "users")
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name_user", nullable = false)
    private String nameUser;

    @Column(name = "login_user", unique = true, nullable = false)
    private String loginUser;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    public User(String nameUser, String login, String password) {
        this.nameUser = nameUser;
        this.loginUser = login;
        this.password = password;
    }

    public User() {

    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getNameUser() { return nameUser; }
    public void setNameUser(String nameUser) { this.nameUser = nameUser; }

    public String getLoginUser() { return loginUser; }
    public void setLoginUser(String loginUser) { this.loginUser = loginUser; }

    public void setPassword(String password) { this.password = password; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return List.of(); }

    @Override
    public String getPassword() { return password; }

    @Override
    public String getUsername() { return loginUser; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}