package com.logistica.app.service;

import com.logistica.app.model.Agencia;
import com.logistica.app.repository.AgenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AgenciaService {
    @Autowired private AgenciaRepository repo;
    public List<Agencia> listarTodas() { return repo.findAll(); }
}
