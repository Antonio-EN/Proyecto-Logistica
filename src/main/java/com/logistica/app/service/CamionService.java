package com.logistica.app.service;

import com.logistica.app.model.Camion;
import com.logistica.app.repository.CamionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CamionService {
    @Autowired private CamionRepository repo;
    public List<Camion> listarTodos() { return repo.findAll(); }
}
