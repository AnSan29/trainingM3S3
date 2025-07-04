/**
 * - funcion para:
 *    renderizar mi html por default, apenas cargue la vista se ejecuta
 */
export default function ApiUi() {
  // Retornamos un fragmento de HTML como string.
  // Este contenido se mostrará dinámicamente en el div con id="app".
  return `
  <!-- contenedor crud productos -->

        <section class="crud">
      <article class="container my-5">
        <div class="card shadow rounded">
          <div class="card-header bg-dark text-white">
            <h2 class="h4 m-0 crud-title">Agregar Producto</h2>
          </div>
          <div class="card-body">
            <form class="crud-form">
              <div class="mb-3">
                <label for="nombre" class="form-label"
                  >Nombre del producto</label
                >
                <input
                  type="text"
                  class="form-control"
                  name="nombre"
                  placeholder="nombre"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="precio" class="form-label">Precio</label>
                <input
                  type="number"
                  class="form-control"
                  name="precio"
                  placeholder="precio"
                  required
                />
              </div>

              <input type="hidden" name="id" />

              <div class="d-grid">
                <input type="submit" value="Enviar" class="btn btnSubmit btn-success" />
              </div>
            </form>
          </div>
        </div>
      </article>

      <article class="container my-5">
        <div class="card shadow rounded">
          <div class="card-header bg-dark  text-white">
            <h2 class="h4 m-0">Ver Productos</h2>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                class="table table-bordered table-hover text-center align-middle crud-table"
              >
                <thead class="table-primary">
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </article>
    </section>

    <template id="crud-template">
    <tr>
      <td class="name">name</td>
      <td class="price">price</td>
      <td class="stock">stock</td>
      <td class="status">status</td>
      <td>
        <div class="d-flex justify-content-center gap-2">
          <button class="btn btn-sm btn-warning edit">
            Editar
          </button>
          <button class="btn btn-sm btn-danger delete">
            Eliminar
          </button>
        </div>
      </td>
    </tr>
   </template>
   
    `;
}

/**
 * - funcion para:
 *     obtener elementos de mi DOM cuando este cargado.
 *     obtener los productos desde el backend  con fetch.
 *     mostrar dinamicamente los elementos en una tabla usando la plantilla en el DOM.
 */
export function apiUiController() {
  /**
   * - Obtenemos nuestros elementos del dom y los almacenamos en variables
   *   inicializadas en $ para su facil identificacion.
   * - Guardo en una variable d el document.
   */
  const d = document,
    $table = d.querySelector(".crud-table"),
    $form = d.querySelector(".crud-form"),
    $title = d.querySelector(".crud-title"),
    $template = d.getElementById("crud-template").content,
    $fragment = d.createDocumentFragment();

  /**
   * - Declaro mi funcion tipo GET para obtener todos mis productos
   *   implementando fetch + async - await.
   */
  const getAllProducts = async () => {
    try {
      let res = await fetch("http://localhost:5000/productos");
      let json = await res.json();

      // valido si la respuesta no es ok, de ser asi lanzo el error al catch como un objeto con dos variables
      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      console.log(json);

      json.forEach((el) => {
        //pintamos valores del elemento en nuestra plantilla
        $template.querySelector(".name").textContent = el.name;
        $template.querySelector(".price").textContent = el.price;

        $template.querySelector(".stock").textContent = el.stock;
        if (el.status) {
          $template.querySelector(".status").textContent = "Activo";
        } else {
          $template.querySelector(".status").textContent = "Inactivo";
        }
        // asignacion de data-atribute con metodo dataset de mis botones de acciones en mi plantilla

        // btn editar:
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".edit").dataset.name = el.name;
        $template.querySelector(".edit").dataset.price = el.price;
        $template.querySelector(".edit").dataset.stock = el.stock;
        $template.querySelector(".edit").dataset.status = el.status;

        // btn eliminar:
        $template.querySelector(".delete").dataset.id = el.id;
        $template.querySelector(".delete").dataset.name = el.name;
        $template.querySelector(".delete").dataset.price = el.price;
        $template.querySelector(".delete").dataset.stock = el.stock;
        $template.querySelector(".delete").dataset.status = el.status;

        // Clonamos nuestra plantilla
        let $templateCLone = d.importNode($template, true);
        // y se lo pasamos al fragmento del DOM para que nos permita hacer solo una incercion al DOM real.
        $fragment.appendChild($templateCLone);
      });

      // incertamos el fragmento del DOM en el real DOM
      $table.querySelector("tbody").appendChild($fragment);

      //  capturo el error con catch
    } catch (err) {
      console.log(err);

      // declaro variable para almacenar mensaje de error con operador de corto circuito
      let message = err.statusText || "Ocurrio un error";

      // pinto el error
      $table.insertAdjacentHTML(
        "afterend",
        `<p> <b>Error ${err.status}: ${message}</b> </p>`
      );
    }
  };
  // ejecuto mi funcion getAllProducts()
  getAllProducts();

  // escuchamos el evento submit del dom para metodos PUT y POST
  d.addEventListener("submit", async (e) => {
    // validar si  quien ocasiona el evento es el elemento form
    if (e.target === $form) {
      e.preventDefault();

      // validar si el elemento input id no contiene valor
      if (!e.target.id.value) {
        // si no contiene, entonces es una peticion POST - CREATE
        try {
          let options = {
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({
              name: e.target.nombre.value,
              price: e.target.precio.value,
              status: true,
              stock: 200,
            }),
          };
          // guardo la respuesta de mi fetch en variable res, volviendolo ascincrono
          let res = await fetch("http://localhost:5000/productos", options);
          // convierto la respuesta a json
          let json = await res.json();

          if (!res.ok) throw { status: res.status, statusText: res.statusText };

          location.reload();
        } catch (err) {
          let message = err.statusText || "Ocurrio un error";
          $form.insertAdjacentHTML(
            "afterend",
            `<p> <b>Error ${err.status}: ${message}</b> </p>`
          );
        }
      } else {
        // si contiene valor, entonces es una peticion PUT - UPDATE
        try {
          let options = {
            method: "PUT",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({
              name: e.target.nombre.value,
              price: e.target.precio.value,
              status: true,
              stock: 200,
            }),
          };
          // guardo la respuesta de mi fetch en variable res, volviendolo ascincrono
          let res = await fetch(
            `http://localhost:5000/productos/${e.target.id.value}`,
            options
          );
          // convierto la respuesta a json
          let json = await res.json();

          if (!res.ok) throw { status: res.status, statusText: res.statusText };

          location.reload();
        } catch (err) {
          let message = err.statusText || "Ocurrio un error";
          $form.insertAdjacentHTML(
            "afterend",
            `<p> <b>Error ${err.status}: ${message}</b> </p>`
          );
        }
      }
    }
  });

  // escuchamos el evento click del dom para metodos PUT y DELETE
  d.addEventListener("click", async (e) => {
    // btn edit
    if (e.target.matches(".edit")) {
      $title.textContent = "Editar Santo";
      $form.nombre.value = e.target.dataset.name;
      $form.precio.value = e.target.dataset.price;
      $form.id.value = e.target.dataset.id;
    }
    // btn delete
    if (e.target.matches(".delete")) {
      let isDelete = confirm(
        `Estas seguro de eliminar el id ${e.target.dataset.id} ?`
      );

      if (isDelete) {
        //Delete -- DELETE
        try {
          let options = {
            method: "PUT",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({
              name: e.target.dataset.name,
              price: e.target.dataset.price,
              status: false,
              stock: 0,
            }),
          };
          // guardo la respuesta de mi fetch en variable res, volviendolo ascincrono
          let res = await fetch(
            `http://localhost:5000/productos/${e.target.dataset.id}`,
            options
          );
          // convierto la respuesta a json
          let json = await res.json();

          if (!res.ok) throw { status: res.status, statusText: res.statusText };

          location.reload();
        } catch (err) {
          let message = err.statusText || "Ocurrio un error";
          alert(`Error: ${err.status}: ${message}  `);
        }
      }
    }
  });
}
