const listaAmigos = [];
const listaElement = document.getElementById('listaAmigos');
const resultadoElement = document.getElementById('resultado');

// Añadir amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre === '') {
        alert('Por favor, escribe un nombre válido.');
        return;
    }

    if (listaAmigos.includes(nombre)) {
        alert('Este nombre ya está en la lista.');
        input.value = '';
        return;
    }

    listaAmigos.push(nombre);
    mostrarLista();
    input.value = '';
}

// Mostrar lista actualizada
function mostrarLista() {
    listaElement.innerHTML = '';
    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${amigo}`;
        listaElement.appendChild(li);
    });
}

// Realizar sorteo
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert('Debes ingresar al menos dos amigos para realizar el sorteo.');
        return;
    }

    const copia = [...listaAmigos];
    const resultado = {};

    for (let i = 0; i < listaAmigos.length; i++) {
        const amigo = listaAmigos[i];

        let posibles = copia.filter(a => a !== amigo);
        if (posibles.length === 0) {
            // Reiniciar sorteo si se queda sin opciones válidas
            return sortearAmigo();
        }

        const indiceAleatorio = Math.floor(Math.random() * posibles.length);
        const asignado = posibles[indiceAleatorio];

        resultado[amigo] = asignado;
        copia.splice(copia.indexOf(asignado), 1);
    }

    mostrarResultado(resultado);
}

// Mostrar resultado en pantalla
function mostrarResultado(parejas) {
    resultadoElement.innerHTML = '';
    for (const [amigo, asignado] of Object.entries(parejas)) {
        const li = document.createElement('li');
        li.textContent = `${amigo} → ${asignado}`;
        resultadoElement.appendChild(li);
    }
}
