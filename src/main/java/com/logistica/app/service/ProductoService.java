package com.logistica.app.service;

import com.logistica.app.model.Producto;
import com.logistica.app.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductoService {
    @Autowired private ProductoRepository repo;
    public List<Producto> listarTodos() { return repo.findAll(); }
}
