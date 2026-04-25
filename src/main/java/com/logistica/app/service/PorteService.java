package com.logistica.app.service;

import com.logistica.app.model.Porte;
import com.logistica.app.repository.PorteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class PorteService {

    @Autowired
    private PorteRepository porteRepository;

    public List<Porte> obtenerTodos() {
        return porteRepository.findAll();
    }

    public Porte guardar(Porte porte) {
        return porteRepository.save(porte);
    }

    public void eliminar(Integer id) {
        porteRepository.deleteById(id);
    }

    public Porte obtenerPorId(Integer id) {
        return porteRepository.findById(id).orElse(null);
    }

    // Lógica para estadísticas simples
    public Map<String, Object> obtenerEstadisticas() {
        List<Porte> todos = porteRepository.findAll();
        Map<String, Object> stats = new HashMap<>();

        // Número de portes pendientes
        long pendientes = todos.stream()
                .filter(p -> "Pendiente".equalsIgnoreCase(p.getEstado()))
                .count();
        stats.put("pendientes", pendientes);

        // Portes por Agencia (Agrupados por el nombre de la agencia)
        Map<String, Long> porAgencia = todos.stream()
                .filter(p -> p.getCamion() != null && p.getCamion().getAgencia() != null)
                .collect(Collectors.groupingBy(p -> p.getCamion().getAgencia().getNombre(), Collectors.counting()));
        stats.put("porAgencia", porAgencia);

        // Portes por Destino
        Map<String, Long> porDestino = todos.stream()
                .collect(Collectors.groupingBy(Porte::getDestino, Collectors.counting()));
        stats.put("porDestino", porDestino);

        // Portes por Origen
        Map<String, Long> porOrigen = todos.stream()
                .collect(Collectors.groupingBy(Porte::getOrigen, Collectors.counting()));
        stats.put("porOrigen", porOrigen);

        return stats;
    }
}
