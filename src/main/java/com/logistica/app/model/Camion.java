package com.logistica.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "camiones")
public class Camion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCamion;

    @Column(unique = true, nullable = false)
    private String matricula;

    private String modelo;

    @ManyToOne
    @JoinColumn(name = "id_agencia")
    private Agencia agencia;

    // Constructores
    public Camion() {}

    // Getters y Setters
    public Integer getIdCamion() { return idCamion; }
    public void setIdCamion(Integer idCamion) { this.idCamion = idCamion; }

    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public Agencia getAgencia() { return agencia; }
    public void setAgencia(Agencia agencia) { this.agencia = agencia; }
}
