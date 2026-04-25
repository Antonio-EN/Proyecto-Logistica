package com.logistica.app.repository;

import com.logistica.app.model.UsuarioWeb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioWebRepository extends JpaRepository<UsuarioWeb, Integer> {
    Optional<UsuarioWeb> findByUsername(String username);
}
