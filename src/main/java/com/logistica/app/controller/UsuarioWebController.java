package com.logistica.app.controller;

import com.logistica.app.model.UsuarioWeb;
import com.logistica.app.service.UsuarioWebService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioWebController {

    @Autowired
    private UsuarioWebService service;

    @GetMapping("/me")
    public UsuarioWeb getMe(java.security.Principal principal) {
        if (principal == null) return null;
        return service.buscarPorUsername(principal.getName());
    }

    @GetMapping
    public List<UsuarioWeb> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public UsuarioWeb crear(@RequestBody UsuarioWeb usuario) {
        return service.guardar(usuario);
    }

    @DeleteMapping("/{id}")
    public void borrar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}
