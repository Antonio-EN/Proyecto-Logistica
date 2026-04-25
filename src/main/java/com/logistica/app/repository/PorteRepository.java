package com.logistica.app.repository;

import com.logistica.app.model.Porte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PorteRepository extends JpaRepository<Porte, Integer> {
    // Aquí podremos añadir métodos de filtrado personalizados si fuera necesario.
}
