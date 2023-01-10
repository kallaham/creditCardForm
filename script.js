
const tarjeta = document.querySelector('#tarjeta'),
      btnOpenForms  = document.querySelector('#btn-open'),
      btnRotateCard  = document.querySelector('#btn-rotate'),
      formulario  = document.querySelector('#formulario-tarjeta'),
      inputs  = document.querySelectorAll('#formulario-tarjeta input'),  
      numeroTarjeta = document.querySelector('#tarjeta .numero'),
      nombreTarjeta = document.querySelector('#tarjeta .nombre'),
      logoMarca = document.querySelector('#marca'),
      firma = document.querySelector('#tarjeta .firma p'),
      mesExpiracion = document.querySelector('#tarjeta .mes'),
      anhoExpiracion = document.querySelector('#tarjeta .anho'),
      cvv = document.querySelector('#tarjeta .cvv'),
      tablaBody = document.querySelector('#tabla tbody');

// * formulario

formulario.addEventListener("submit", function(event){
    event.preventDefault();
    let datosFormulario = new FormData(formulario); //tiene los datos del formulario
    let tableRef = document.getElementById("datosTabla"); // referenciar la tabla a crear
    let newRow = tableRef.insertRow(-1); // referenciar la tabla para crear la fila y la deja de últimas 
    let newCel = newRow.insertCell(0); // referencia la fila para crear la celda 

    //Permite tomar el número de la tarjeta y ocultar los digitos y guardar registros
    String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }
    let numCard = document.getElementById("inputNumero").value;
    let hideNumCard = String(numCard);
    hideNumCard = hideNumCard.replaceAt(0,"**** **** ****");
    newCel.textContent = datosFormulario.get("inputNumero").value = (hideNumCard);

    //Registra los otros datos del formulario
    newCel = newRow.insertCell(1);
    newCel.textContent = datosFormulario.get("inputNombre");
    newCel = newRow.insertCell(2);
    newCel.textContent = datosFormulario.get("mes");
    newCel = newRow.insertCell(3);
    newCel.textContent = datosFormulario.get("anho");

    // Permite tomar el dato del código de seguridad CVV y lo transforma en base 64 
    let numCvv = document.getElementById("inputCvv").value;
    let encrCvv = String(numCvv);
    encrCvv = btoa(encrCvv);
    newCel = newRow.insertCell(4);
    newCel.textContent = datosFormulario.get("inputCvv").value = (encrCvv);   

    if(!datosFormulario == ''){
        datosFormulario.reset();
    } else{
        alert('Fallor rellenar todos los campos')
    }

})

// * voltear tarjeta visualizar parte frontal
const mostrarFrontal = () => {
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
}

// * Rotación de la tarjeta      
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});


//* Botón de abrir formulario
btnOpenForms.addEventListener('click', () => {
    btnOpenForms.classList.toggle('active');
    formulario.classList.toggle('active');
})

//* Botón de rotar tarjeta
btnRotateCard.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});


// * Rellenar meses del año en el select
for(let i = 1; i <=12; i ++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

// * Rellenar los años en el select
const anhoActual = new Date().getFullYear();
for(let i = anhoActual; i<= anhoActual + 8; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectAnho.appendChild(opcion);
}


// * Número de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
    // Eliminar espacios en blanco
    .replace(/\s/g, '')
    // Eliminar las letras 
    .replace(/\D/g, '')
    // Espacio en cada 4 digitos
    .replace(/([0-9]{4})/g, '$1 ')
    // Elimina el ultimo espaciado
    .trim();

    numeroTarjeta.textContent = valorInput;

    // Permite restablecer los campos pordefecto
    if(valorInput == ''){
        numeroTarjeta.textContent = '#### #### #### ####';
        logoMarca.innerHTML = '';
    }

    //cambiar de logo de marca dependiendo el digito inicial
    if(valorInput[0] == 4){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/visa.png'; // VISA
        marca.appendChild(imagen);
    } else if(valorInput[0] == 5){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/master.png'; // MASTER CARD
        marca.appendChild(imagen);
    }

    // Voltear la tarjeta para visualizar la parte frontal
    mostrarFrontal();
});


// * Nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if(valorInput == ''){
        nombreTarjeta.textContent = 'NOMBRE DEL TITULAR';
    }
    mostrarFrontal();
})


// * Expiración de la tarjeta

//MES
formulario.selectMes.addEventListener('change', (e) =>{
    mesExpiracion.textContent = e.target.value;
    mostrarFrontal();
})

//AÑO
formulario.selectAnho.addEventListener('change', (e) =>{
    anhoExpiracion.textContent = e.target.value.slice(2);
    mostrarFrontal();
})



// * CVV
formulario.inputCvv.addEventListener('keyup', () => {
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.toggle('active');
    }

    formulario.inputCvv = formulario.inputCvv.value
    // Eliminar espacios en blanco
    .replace(/\s/g, '')
    // Eliminar las letras
    .replace(/\D/g, '');
    
    cvv.textContent = formulario.inputCvv.value;
    
})






                
        
  






