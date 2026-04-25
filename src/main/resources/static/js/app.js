// Variables globales para almacenar datos
let todosLosPortes = [];
let agencias = [];
let camiones = [];
let productos = [];

const ORIGENES = ['Proveedor 1', 'Proveedor 2', 'Proveedor 3'];
const DESTINOS = ['Distribuidora', 'Cliente Final'];

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    inicializarNavegacion();
    verificarUsuario();
    cargarDatosAuxiliares().then(() => {
        cargarDashboard(); // Vista inicial
    });
});

async function verificarUsuario() {
    try {
        const response = await fetch('/api/usuarios/me');
        const user = await response.json();
        if (user) {
            document.getElementById('userNameDisplay').innerText = user.nombre;
            // Si no es admin, ocultamos el menú de usuarios
            if (user.role !== 'administrador') {
                document.getElementById('btnUsuarios').parentElement.style.display = 'none';
                document.querySelector('.sidebar-heading').style.display = 'none';
            }
        }
    } catch (e) {
        console.log("No logueado o error");
    }
}

// --- NAVEGACIÓN ---
function inicializarNavegacion() {
    document.getElementById('btnDashboard').addEventListener('click', (e) => {
        e.preventDefault();
        cambiarActivo(e.target);
        cargarDashboard();
    });

    document.getElementById('btnEstadisticas').addEventListener('click', (e) => {
        e.preventDefault();
        cambiarActivo(e.target);
        cargarEstadisticas();
    });

    document.getElementById('btnUsuarios').addEventListener('click', (e) => {
        e.preventDefault();
        cambiarActivo(e.target);
        cargarGestionUsuarios();
    });
}

function cambiarActivo(elemento) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    elemento.closest('.nav-link').classList.add('active');
}

// --- CARGA DE DATOS ---
async function cargarDatosAuxiliares() {
    try {
        const [resAg, resCam, resProd] = await Promise.all([
            fetch('/api/auxiliar/agencias'),
            fetch('/api/auxiliar/camiones'),
            fetch('/api/auxiliar/productos')
        ]);
        agencias = await resAg.json();
        camiones = await resCam.json();
        productos = await resProd.json();
    } catch (error) {
        console.error("Error cargando datos auxiliares", error);
    }
}

async function cargarDashboard() {
    const container = document.getElementById('viewContainer');
    container.innerHTML = '<h2>Panel de Control</h2><p class="text-muted">Cargando datos...</p>';

    try {
        const response = await fetch('/api/portes');
        todosLosPortes = await response.json();
        renderizarDashboard();
    } catch (error) {
        container.innerHTML = '<div class="alert alert-danger">Error al conectar con el servidor</div>';
    }
}

// --- RENDERIZADO ---
function renderizarDashboard() {
    const container = document.getElementById('viewContainer');
    
    let html = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold">Panel de Control</h2>
            <button class="btn btn-primary shadow-sm" onclick="abrirModalNuevoPorte()">
                <i class="fas fa-plus me-1"></i> Nuevo Porte
            </button>
        </div>

        <!-- Sección de Filtros con Etiquetas -->
        <div class="card mb-4 p-3 border-secondary shadow-sm">
            <div class="row g-3">
                <div class="col-md-2">
                    <label class="form-label small fw-bold text-info">ID Porte</label>
                    <input type="text" class="form-control form-control-sm bg-dark text-light border-secondary" id="filterId" placeholder="Filtrar ID..." onkeyup="filtrarTabla()">
                </div>
                <div class="col-md-2">
                    <label class="form-label small fw-bold text-info">Estado</label>
                    <select class="form-select form-select-sm bg-dark text-light border-secondary" id="filterEstado" onchange="filtrarTabla()">
                        <option value="">Todos</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Realizado">Realizado</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label small fw-bold text-info">Producto</label>
                    <select class="form-select form-select-sm bg-dark text-light border-secondary" id="filterProducto" onchange="filtrarTabla()">
                        <option value="">Todos</option>
                        ${productos.map(p => `<option value="${p.nombre}">${p.nombre}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label small fw-bold text-info">Matrícula</label>
                    <input type="text" class="form-control form-control-sm bg-dark text-light border-secondary" id="filterMatricula" placeholder="Ej: 1234ABC" onkeyup="filtrarTabla()">
                </div>
                <div class="col-md-2">
                    <label class="form-label small fw-bold text-info">Origen</label>
                    <select class="form-select form-select-sm bg-dark text-light border-secondary" id="filterOrigen" onchange="filtrarTabla()">
                        <option value="">Todos</option>
                        ${ORIGENES.map(o => `<option value="${o}">${o}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label small fw-bold text-info">Destino</label>
                    <select class="form-select form-select-sm bg-dark text-light border-secondary" id="filterDestino" onchange="filtrarTabla()">
                        <option value="">Todos</option>
                        ${DESTINOS.map(d => `<option value="${d}">${d}</option>`).join('')}
                    </select>
                </div>
            </div>
        </div>

        <!-- Tabla -->
        <div class="card shadow-sm border-secondary">
            <div class="table-responsive">
                <table class="table table-dark table-hover mb-0">
                    <thead class="table-dark border-bottom border-secondary">
                        <tr>
                            <th>ID</th>
                            <th>Camión</th>
                            <th>Agencia</th>
                            <th>Producto</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyPortes">
                        ${generarFilasTabla(todosLosPortes)}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function generarFilasTabla(datos) {
    if (datos.length === 0) return '<tr><td colspan="9" class="text-center py-4 text-muted">No hay registros que coincidan</td></tr>';
    
    return datos.map(p => `
        <tr>
            <td><a href="#" class="text-info text-decoration-none fw-bold" onclick="editarPorte(${p.idPorte})">${p.idPorte}</a></td>
            <td>${p.camion ? p.camion.matricula : 'N/A'}</td>
            <td>${p.camion && p.camion.agencia ? p.camion.agencia.nombre : 'N/A'}</td>
            <td>${p.producto ? p.producto.nombre : 'N/A'}</td>
            <td>${p.fecha}</td>
            <td><span class="badge ${p.estado === 'Realizado' ? 'bg-success' : 'bg-warning text-dark'}">${p.estado}</span></td>
            <td>${p.origen}</td>
            <td>${p.destino}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-danger border-0" onclick="borrarPorte(${p.idPorte})" title="Eliminar" style="font-size: 1.1rem;">
                    🗑️
                </button>
            </td>
        </tr>
    `).join('');
}

function filtrarTabla() {
    const id = document.getElementById('filterId').value.toLowerCase();
    const matricula = document.getElementById('filterMatricula').value.toLowerCase();
    const estado = document.getElementById('filterEstado').value;
    const producto = document.getElementById('filterProducto').value;
    const origen = document.getElementById('filterOrigen').value;
    const destino = document.getElementById('filterDestino').value;

    const filtrados = todosLosPortes.filter(p => {
        const mat = (p.camion ? p.camion.matricula : '').toLowerCase();
        return (p.idPorte.toString().includes(id)) &&
               (mat.includes(matricula)) &&
               (estado === "" || p.estado === estado) &&
               (producto === "" || (p.producto && p.producto.nombre === producto)) &&
               (origen === "" || p.origen === origen) &&
               (destino === "" || p.destino === destino);
    });

    document.getElementById('tbodyPortes').innerHTML = generarFilasTabla(filtrados);
}

// --- FUNCIONES CRUD ---
function abrirModalNuevoPorte() {
    document.getElementById('porteModalLabel').innerText = "Nuevo Porte (ID: Auto)";
    document.getElementById('porteForm').reset();
    document.getElementById('porteId').value = "";
    
    poblarDesplegablesModal();
    
    const modal = new bootstrap.Modal(document.getElementById('porteModal'));
    modal.show();
}

function editarPorte(id) {
    const p = todosLosPortes.find(item => item.idPorte === id);
    if (!p) return;

    document.getElementById('porteModalLabel').innerText = "Editando Porte #" + id;
    document.getElementById('porteId').value = p.idPorte;
    
    poblarDesplegablesModal();
    
    document.getElementById('porteCamion').value = p.camion ? p.camion.idCamion : "";
    document.getElementById('porteProducto').value = p.producto ? p.producto.idProducto : "";
    document.getElementById('porteFecha').value = p.fecha;
    document.getElementById('porteEstado').value = p.estado;
    document.getElementById('porteOrigen').value = p.origen;
    document.getElementById('porteDestino').value = p.destino;

    const modal = new bootstrap.Modal(document.getElementById('porteModal'));
    modal.show();
}

function poblarDesplegablesModal() {
    const selCamion = document.getElementById('porteCamion');
    const selProd = document.getElementById('porteProducto');
    
    selCamion.innerHTML = camiones.map(c => `<option value="${c.idCamion}">${c.matricula} (${c.agencia.nombre})</option>`).join('');
    selProd.innerHTML = productos.map(p => `<option value="${p.idProducto}">${p.nombre}</option>`).join('');
}

async function guardarPorte() {
    const id = document.getElementById('porteId').value;
    const porteData = {
        camion: { idCamion: parseInt(document.getElementById('porteCamion').value) },
        producto: { idProducto: parseInt(document.getElementById('porteProducto').value) },
        fecha: document.getElementById('porteFecha').value,
        estado: document.getElementById('porteEstado').value,
        origen: document.getElementById('porteOrigen').value,
        destino: document.getElementById('porteDestino').value
    };

    const url = id ? `/api/portes/${id}` : '/api/portes';
    const method = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(porteData)
        });

        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('porteModal')).hide();
            cargarDashboard();
        } else {
            alert("Error al guardar el porte");
        }
    } catch (error) {
        console.error("Error guardando porte", error);
    }
}

async function borrarPorte(id) {
    if (confirm("¿Estás seguro de borrar el porte " + id + "?")) {
        await fetch(`/api/portes/${id}`, { method: 'DELETE' });
        cargarDashboard();
    }
}

// --- ESTADÍSTICAS ---
async function cargarEstadisticas() {
    const container = document.getElementById('viewContainer');
    container.innerHTML = '<h2>Dashboard de Estadísticas</h2><p class="text-muted">Calculando indicadores...</p>';

    try {
        const response = await fetch('/api/portes/stats');
        const stats = await response.json();
        
        container.innerHTML = `
            <h2 class="fw-bold">Estadísticas de Logística</h2>
            <div class="row g-4 mt-2">
                <div class="col-md-4">
                    <div class="card p-3 text-center border-warning bg-dark shadow-sm h-100">
                        <h6 class="text-warning small fw-bold opacity-75">PORTES PENDIENTES</h6>
                        <h2 class="text-warning fw-bold mb-0">${stats.pendientes}</h2>
                        <p class="text-light small mt-1 opacity-75">Servicios que aún no se han completado y están en espera de ejecución.</p>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="card p-3 text-center border-success bg-dark shadow-sm h-100">
                        <h6 class="text-success small fw-bold opacity-75">DISTRIBUCIÓN POR ORIGEN</h6>
                        <div class="d-flex justify-content-around mt-2">
                            ${Object.entries(stats.porOrigen).map(([k, v]) => `<div class="small"><div class="text-success fw-bold">${v}</div><div class="text-light opacity-75" style="font-size:0.7rem">${k}</div></div>`).join('')}
                        </div>
                        <p class="text-light small mt-2 opacity-75">Cantidad de portes recogidos en cada uno de los proveedores principales.</p>
                    </div>
                </div>
            </div>

            <div class="row mt-4 g-4">
                <div class="col-md-4">
                    <div class="card p-3 bg-dark border-secondary">
                        <h5 class="mb-4 text-light"><i class="fas fa-building me-2"></i>Por Agencia</h5>
                        <canvas id="chartAgencia"></canvas>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card p-3 bg-dark border-secondary">
                        <h5 class="mb-4 text-light"><i class="fas fa-map-marker-alt me-2"></i>Por Destino</h5>
                        <canvas id="chartDestino"></canvas>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card p-3 bg-dark border-secondary">
                        <h5 class="mb-4 text-light"><i class="fas fa-boxes me-2"></i>Por Origen</h5>
                        <canvas id="chartOrigen"></canvas>
                    </div>
                </div>
            </div>
        `;

        renderizarGraficos(stats);
    } catch (error) {
        console.error("Error cargando estadísticas", error);
    }
}

function renderizarGraficos(stats) {
    new Chart(document.getElementById('chartAgencia'), {
        type: 'bar',
        data: {
            labels: Object.keys(stats.porAgencia),
            datasets: [{
                label: 'Número de Portes',
                data: Object.values(stats.porAgencia),
                backgroundColor: 'rgba(13, 110, 253, 0.6)',
                borderColor: '#0d6efd',
                borderWidth: 1
            }]
        },
        options: { 
            scales: { 
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#a1a1aa' } },
                x: { ticks: { color: '#a1a1aa' } }
            },
            plugins: { legend: { display: false } }
        }
    });

    new Chart(document.getElementById('chartDestino'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(stats.porDestino),
            datasets: [{
                data: Object.values(stats.porDestino),
                backgroundColor: ['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#fd7e14'],
                borderWidth: 0
            }]
        },
        options: {
            plugins: { legend: { position: 'bottom', labels: { color: '#e1e1e6' } } }
        }
    });

    new Chart(document.getElementById('chartOrigen'), {
        type: 'pie',
        data: {
            labels: Object.keys(stats.porOrigen),
            datasets: [{
                data: Object.values(stats.porOrigen),
                backgroundColor: ['#198754', '#20c997', '#0dcaf0'],
                borderWidth: 0
            }]
        },
        options: {
            plugins: { legend: { position: 'bottom', labels: { color: '#e1e1e6' } } }
        }
    });
}

// --- GESTIÓN DE USUARIOS ---
async function cargarGestionUsuarios() {
    const container = document.getElementById('viewContainer');
    container.innerHTML = '<h2>Gestión de Usuarios</h2><p class="text-muted">Cargando...</p>';

    try {
        const response = await fetch('/api/usuarios');
        const lista = await response.json();
        
        container.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="fw-bold">Gestión de Usuarios</h2>
                <button class="btn btn-success shadow-sm" onclick="abrirModalUsuario()">
                    <i class="fas fa-user-plus me-1"></i> Nuevo Usuario
                </button>
            </div>
            <div class="card shadow-sm border-secondary">
                <table class="table table-dark table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lista.map(u => `
                            <tr>
                                <td>${u.username}</td>
                                <td>${u.nombre}</td>
                                <td>${u.email}</td>
                                <td><span class="badge ${u.role === 'administrador' ? 'bg-danger' : 'bg-info'}">${u.role}</span></td>
                                <td>
                                    <button class="btn btn-sm btn-outline-danger border-0" onclick="borrarUsuario(${u.idUsuario})" title="Eliminar" style="font-size: 1.1rem;">
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        container.innerHTML = '<div class="alert alert-danger">Error al cargar usuarios (¿Eres administrador?)</div>';
    }
}

function abrirModalUsuario() {
    document.getElementById('usuarioForm').reset();
    new bootstrap.Modal(document.getElementById('usuarioModal')).show();
}

async function guardarUsuario() {
    const data = {
        username: document.getElementById('uUsername').value,
        password: document.getElementById('uPassword').value,
        nombre: document.getElementById('uNombre').value,
        email: document.getElementById('uEmail').value,
        role: document.getElementById('uRole').value
    };

    const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        bootstrap.Modal.getInstance(document.getElementById('usuarioModal')).hide();
        cargarGestionUsuarios();
    } else {
        alert("Error al crear usuario");
    }
}

async function borrarUsuario(id) {
    if (confirm("¿Seguro que quieres borrar este usuario?")) {
        await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
        cargarGestionUsuarios();
    }
}
