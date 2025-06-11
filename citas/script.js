let citas = JSON.parse(localStorage.getItem("citas")) || [];
let img_mascotas = [
        { tipo: "Perro", url: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg" },
        { tipo: "Gato", url: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" },
        { tipo: "Tortuga", url: "https://static.vecteezy.com/system/resources/previews/005/561/702/non_2x/turtle-cartoon-colored-illustration-free-vector.jpg" },
        { tipo: "Hamster", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIxwhldanJW7OBf1I9VNMkSAn16eVA2WhrJw&s" },
        { tipo: "Conejo", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkrIXRd6fGormwttUSM-Ao98bG3xZGsUwug&s" },
        { tipo: "Oveja", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ihVHcrZS0Dgy1BiE7WwKwgmBGFCM4XbhmQ&s" },
        { tipo: "Pato", url: "https://www.regmurcia.com/servlet/integra.servlets.Imagenes?METHOD=VERIMAGEN_101949&nombre=Pato_de_granja_Pato_res_720.jpg" },
        { tipo: "Loro", url: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/359320471/320" },
        { tipo: "Caballo", url: "https://concepto.de/wp-content/uploads/2021/07/caballos-e1626738224231.jpg" }
];
let validations1 = false
let pos = null
let op = 0

document.getElementById("guardar").addEventListener("click", () => {
        validations()
        if (op == 0) {
                if (validations1 == true) {
                        save_data()
                        Filtro()
                        clear()
                        validations1 = false
                        op = 0
                }
        }

        else if (op == 1) {
                citas[pos].NamePet = document.getElementById("nombre_mascota").value;
                citas[pos].owner = document.getElementById("Propietario").value;
                citas[pos].number = document.getElementById("numero").value;
                citas[pos].date = document.getElementById("fecha").value;
                citas[pos].hour = document.getElementById("hora").value;
                citas[pos].type = document.getElementById("tipo_animal").value;
                citas[pos].description = document.getElementById("descripcion").value;
                localStorage.setItem("citas", JSON.stringify(citas));
                Filtro()
                clear()
                op = 0
                document.getElementById("save_data").textContent = "editar"
        }

})

function save_data() {
        const mascota = {
                NamePet: document.getElementById("nombre_mascota").value,
                owner: document.getElementById("Propietario").value,
                number: document.getElementById("numero").value,
                date: document.getElementById("fecha").value,
                hour: document.getElementById("hora").value,
                type: document.getElementById("tipo_animal").value,
                description: document.getElementById("descripcion").value,
                Estado: "Abierta"
        };

        citas.push(mascota);
        clear()
        console.log(citas);
        localStorage.setItem("citas", JSON.stringify(citas));
}
function clear() {
        document.getElementById("nombre_mascota").value = ""
        document.getElementById("Propietario").value = ""
        document.getElementById("numero").value = ""
        document.getElementById("fecha").value = ""
        document.getElementById("hora").value = ""
        document.getElementById("descripcion").value = ""
}
function generar_tarjeta(lista = citas) {
        const contenedor = document.getElementById("card1");
        contenedor.innerHTML = "";
        lista.forEach((item, index) => {
                let find1 = img_mascotas.find(element => element.tipo === item.type);
                console.log(find1.url);
                contenedor.innerHTML += `
                        <div class="tarjeta" id="tarjeta-${index}">
                        <img src="${find1.url}" alt="" >
                        <h1>Nombre: ${item.NamePet}</h1>
                        <h3>Propietario: ${item.owner}</h3>
                        <h3>Teléfono: ${item.number}</h3>
                        <h3>Fecha: ${item.date}</h3>
                        <h3>Hora: ${item.hour}</h3>
                        <h3>mascota: ${item.type}</h3>
                        <h3>Sistemas: ${item.description}</h3>
                        <select name="Estado" class="estado">
                                <label for="">Estado</label>
                                <option value="Abierta">Abierta</option>
                                <option value="Terminada">Terminada</option>
                                <option value="Anulada">Anulada</option>
                                </select>
                        <button class="editar"data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="edit(${index})">Editar</button>
                        <button class="eliminar" name="delete" ">Eliminar</button>
                        </div>
                `;


                let borrar = contenedor.querySelectorAll("button[name='delete']")
                let select = contenedor.querySelectorAll("select[name='Estado']")
                borrar.forEach((element, index) => {
                        element.addEventListener("click", () => {
                                Swal.fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes, delete it!"
                                }).then((result) => {
                                        if (result.isConfirmed) {
                                                DeleteCard(index)
                                                Swal.fire({
                                                        title: "Deleted!",
                                                        text: "Your file has been deleted.",
                                                        icon: "success"
                                                });

                                        }
                                });
                        })
                })

                select.forEach((element, index1) => {
                        element.value = lista[index1].Estado
                        element.addEventListener("input", () => {
                                citas[index1].Estado = element.value
                                localStorage.setItem("citas", JSON.stringify(citas));
                                Filtro()
                        })
                })
        });


}

function validations() {
        let NamePet = document.getElementById("nombre_mascota").value;
        let owner = document.getElementById("Propietario").value;
        let number = document.getElementById("numero").value;
        let date = document.getElementById("fecha").value;
        let hour = document.getElementById("hora").value;
        let type = document.getElementById("tipo_animal").value;
        let description = document.getElementById("descripcion").value;
        const [h, m] = hour.split(":").map(Number);
        const fechaSeleccionada = new Date(date);

        const fechaActual = new Date();
        console.log(fechaActual);


        if (NamePet == "") {
                Swal.fire({
                        icon: "error",
                        title: "Digite el nombre de la mascota",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                });
        } else if (owner == "") {
                Swal.fire({
                        icon: "error",
                        title: "Digite el propietario",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                });
        } else if (number == "") {
                Swal.fire({
                        icon: "error",
                        title: "Digite su numero de telefono",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                });
        } else if (date == "") {
                Swal.fire({
                        icon: "error",
                        title: "Digite la fecha ",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                });
        }
        else if (hour == "") {
                Swal.fire({
                        icon: "error",
                        title: "Digite la hora",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                });
        } else if (type == "") {
                Swal.fire({
                        icon: "error",
                        title: "Digite el tipo de mascota",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                });
        } else if (description == "") {
                Swal.fire({
                        icon: "error",
                        title: "Digite una descripcion",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                });
        } else if (description.length > 400) {
                Swal.fire({
                        icon: "error",
                        title: "Digite una descripcion menor a 400 caracteres",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                });
        }
        else if (h < 8 || h > 20 || (h === 20 && m > 0)) {
                Swal.fire({
                        icon: "error",
                        title: "Nuestra veterinaria trabaja de 8:00Am a 8:00Pm ",
                        text: "Por favor digita una hora que este en nuestro rango de trabajo",
                });
        } else if (fechaSeleccionada < fechaActual) {
                Swal.fire({
                        icon: "error",
                        title: "Fecha invalida",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                });

        } else if (number.length < 10 || number.length > 11) {
                Swal.fire({
                        icon: "error",
                        title: "Digite un numero de celular con 10 digitos",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                });
        } else {
                validations1 = true
        }
}
function edit(index) {
        pos = index;
        op = 1;
        const item = citas[index];

        document.getElementById("nombre_mascota").value = item.NamePet;
        document.getElementById("Propietario").value = item.owner;
        document.getElementById("numero").value = item.number;
        document.getElementById("fecha").value = item.date;
        document.getElementById("hora").value = item.hour;
        document.getElementById("tipo_animal").value = item.type;
        document.getElementById("descripcion").value = item.description;

        document.getElementById("save_data").textContent = "Actualizar";
}
document.addEventListener("DOMContentLoaded", () => {
        Filtro()
})
function DeleteCard(index) {
        citas.splice(index, 1);
        localStorage.setItem("citas", JSON.stringify(citas));
        document.getElementById("card1").innerHTML = "";
        generar_tarjeta();
        console.log(index);

}


function Filtro() {
        let filtro = document.getElementById("EstadoFiltro")
        console.log(citas);
        generar_tarjeta(citas.filter(element =>
                element.Estado == filtro.value
        ))

}
document.getElementById("EstadoFiltro").addEventListener("input", () => {
        Filtro()
})
function FilterName(name) {

        let filtrado = citas.filter(element => element.NamePet.includes(name) || element.owner.includes(name))
        console.log(filtrado);
        generar_tarjeta(filtrado)

}

const namef = document.getElementById("BuscarNombre")
namef.addEventListener("input", () => {
        FilterName(namef.value)
        console.log(namef.value);

})
