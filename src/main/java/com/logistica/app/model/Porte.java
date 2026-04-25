package com.logistica.app.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "portes")
public class Porte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPorte;

    @ManyToOne
    @JoinColumn(name = "id_camion")
    private Camion camion;

    @ManyToOne
    @JoinColumn(name = "id_producto")
    private Producto producto;

    private LocalDate fecha;
    private String estado;
    private String origen;
    private String destino;

    // Constructores
    public Porte() {}

    // Getters y Setters
    public Integer getIdPorte() { return idPorte; }
    public void setIdPorte(Integer idPorte) { this.idPorte = idPorte; }

    public Camion getCamion() { return camion; }
    public void setCamion(Camion camion) { this.camion = camion; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getOrigen() { return origen; }
    public void setOrigen(String origen) { this.origen = origen; }

    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }
}
