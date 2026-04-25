package com.logistica.app.controller;

import com.logistica.app.model.Porte;
import com.logistica.app.service.PorteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portes")
@CrossOrigin(origins = "*") // Permitir peticiones desde el frontend
public class PorteController {

    @Autowired
    private PorteService porteService;

    @GetMapping
    public List<Porte> listarTodos() {
        return porteService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Porte buscarPorId(@PathVariable Integer id) {
        return porteService.obtenerPorId(id);
    }

    @PostMapping
    public Porte crear(@RequestBody Porte porte) {
        return porteService.guardar(porte);
    }

    @PutMapping("/{id}")
    public Porte editar(@PathVariable Integer id, @RequestBody Porte porte) {
        porte.setIdPorte(id);
        return porteService.guardar(porte);
    }

    @DeleteMapping("/{id}")
    public void borrar(@PathVariable Integer id) {
        porteService.eliminar(id);
    }

    @GetMapping("/stats")
    public Map<String, Object> obtenerEstadisticas() {
        return porteService.obtenerEstadisticas();
    }
}
