package com.logistica.app.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "agencias")
public class Agencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAgencia;

    private String nombre;
    private String telefono;
    private String direccion;

    @OneToMany(mappedBy = "agencia")
    private List<Camion> camiones;

    // Constructores
    public Agencia() {}

    // Getters y Setters
    public Integer getIdAgencia() { return idAgencia; }
    public void setIdAgencia(Integer idAgencia) { this.idAgencia = idAgencia; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
}
