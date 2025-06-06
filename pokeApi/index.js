const color = [
    { name: "normal", color: "#A8A77A" },
    { name: "fire", color: "#EE8130" },
    { name: "water", color: "#6390F0" },
    { name: "electric", color: "#F7D02C" },
    { name: "grass", color: "#7AC74C" },
    { name: "ice", color: "#96D9D6" },
    { name: "fighting", color: "#C22E28" },
    { name: "poison", color: "#A33EA1" },
    { name: "ground", color: "#E2BF65" },
    { name: "flying", color: "#A98FF3" },
    { name: "psychic", color: "#F95587" },
    { name: "bug", color: "#A6B91A" },
    { name: "rock", color: "#B6A136" },
    { name: "ghost", color: "#735797" },
    { name: "dragon", color: "#6F35FC" },
    { name: "dark", color: "#705746" },
    { name: "steel", color: "#B7B7CE" },
    { name: "fairy", color: "#D685AD" }
];

document.addEventListener("DOMContentLoaded", async () => {
    let ramdonpoke = Math.floor(Math.random() * 400)
    let res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + ramdonpoke)
    let urls = await axios.get(res.data.types[0].type.url)
    console.log(res);
    document.getElementById("nombre").textContent = res.data.name
    document.getElementById("foto_poke").src = res.data.sprites.other.dream_world.front_default
    document.getElementById("altura").textContent = `altura: ` + (res.data.height / 10 + " m")
    document.getElementById("peso").textContent = `peso: ` + (res.data.weight / 10 + " kg")
    document.getElementById("numero_poke").textContent = (`#${res.data.id}`)
    let card1 = document.getElementById("card")
    let tipo1 = document.getElementById("tipo1")
    let hp = document.getElementById("estatus")
    let barra1 = document.getElementById("barras_con")
    let hp2 = res.data.stats
    let tipo = res.data.types
    let debilidad = urls.data.damage_relations.double_damage_from

    let color_com = []
    tipo.forEach((element, i) => {
        let color1 = color.find((colores) => {
            return colores.name == element.type.name
        })

        color_com.push(color1.color)
        console.log(color_com);

        tipo1.innerHTML += `
          <button class="boton_tipo" style="background-color:${color1.color} ;">${element.type.name}</button>
        `
    })

    if (color_com.length >= 2) {
        card1.style = `  background: linear-gradient(to bottom right, ${color_com[0]}, ${color_com[1]} );`
    } else {
        card1.style = `background-color:${color_com[0]};">`
    }
    console.log(color);

    debilidad.forEach((element1) => {
        let color1 = color.find((colores1) => {
            return colores1.name == element1.name
        })

        color_com.push(color1.color)
        document.getElementById("debilidad").innerHTML += `<button class="boton_debi" style="background-color:${color1.color} ;">${element1.name}</button>`
    })
    hp2.forEach((element2) => {
       
        barra1.innerHTML += `
        <h1 class="status">${element2.stat.name}: ${element2.base_stat}/255</h1>
        <div class="barra">
            <div 
                style="background-color: ${color_com[0]}; width: calc(${(element2.base_stat / 255) * 100}%); height: 10px;" 
                id="porcentaje">
            </div>
        </div>`

        console.log(barra1);


    })

})
