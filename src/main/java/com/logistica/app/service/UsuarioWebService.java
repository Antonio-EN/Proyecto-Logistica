package com.logistica.app.service;

import com.logistica.app.model.UsuarioWeb;
import com.logistica.app.repository.UsuarioWebRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioWebService {

    @Autowired
    private UsuarioWebRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UsuarioWeb> listarTodos() {
        return repository.findAll();
    }

    public UsuarioWeb guardar(UsuarioWeb usuario) {
        // Guardamos la contraseña tal cual (texto plano) por petición del usuario
        return repository.save(usuario);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }

    public UsuarioWeb buscarPorUsername(String username) {
        return repository.findByUsername(username).orElse(null);
    }
}
