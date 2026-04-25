package com.logistica.app.controller;

import com.logistica.app.model.Agencia;
import com.logistica.app.model.Camion;
import com.logistica.app.model.Producto;
import com.logistica.app.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/auxiliar")
@CrossOrigin(origins = "*")
public class AuxiliarController {

    @Autowired private AgenciaService agenciaService;
    @Autowired private CamionService camionService;
    @Autowired private ProductoService productoService;

    @GetMapping("/agencias")
    public List<Agencia> getAgencias() { return agenciaService.listarTodas(); }

    @GetMapping("/camiones")
    public List<Camion> getCamiones() { return camionService.listarTodos(); }

    @GetMapping("/productos")
    public List<Producto> getProductos() { return productoService.listarTodos(); }
}
