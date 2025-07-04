# Proyecto:  App de Comidas - TRAINING-M3S3

##  Descripción
Este proyecto consiste en una aplicación CRUD para gestionar productos de comida rápida. Permite al usuario agregar, visualizar, editar y eliminar platillos del sistema. Está dividido en dos partes: un **frontend** (interfaz del usuario) y un **backend** (API con datos simulados).

---

##  Tecnologías utilizadas

### Frontend (front/app-comidas)
- HTML
- CSS
- JavaScript
- Vite

### Backend (back)
- JSON Server
- Node.js (dependencias)

---

## Instalación y ejecución

### Clonar el repositorio
```bash
git clone https://github.com/usuario/tu-repo.git
cd trainingM3S3
```
---
## Iniciar el backend (JSON Server)
```bash
cd back
json-server --watch db.json --port 5555
```
---

## Iniciar el frontend con Vite
```bash
cd ../front/app-comidas
npm install
npm run dev
```
Asegúrate de que el backend esté corriendo en 
```bash
http://localhost:5555
```

## 📁 Estructura del proyecto
```bash
trainingM3S3/
│
├── back/               
│   └── db.json
│
├── front/
│   └── app-comidas/      
│       ├── index.html
│       ├── main.js
│       └── estilos.css
│
└── README.md 
```           
---

## Funcionalidades

- Crear un nuevo platillo.
- Ver lista de productos.
- Editar información del platillo.
- Eliminar platillo.
- Manejo de stock y estado (activo/inactivo)

---

## 👨‍💻 Autor
Andrés de Jesús Santoyo Hurtado
