let contador= 0;
let images=  [ "./images/cozy I.jpeg ", "./images/cozy II.jpg" ,"./images/portada.jpg" , "./images/modern-living-room-style.jpg", ]; 

setTimeout( ()  => { progress()  }, 2000 );


function progress() {
    if (contador < 4) {  
       document.images[0].src= images[contador];
       contador++;
       setTimeout("progress()",2000);
    }
 }
/******************************  CLASES  *********************************/

class Reserva {
    constructor (personas,nombre,noches,checkIn, checkOut,solicitud ){ 

        this.personas = personas;
        this.nombre = nombre;
        this.noches = noches;
        this.checkIn= checkIn;
        this.checkOut= checkOut;
        this.solicitud = solicitud
        
    }

    saludar () { return ( `Gracias ${this.nombre}, tu reserva fue realizada con EXITO! `)} 

    }

let reservaUsuario = [];

if(localStorage.getItem("booking")){
    booking = JSON.parse(localStorage.getItem("booking"));
//console.log(booking , typeof booking)// SACAR

}


class Departamento {
    constructor ( nombre,rooms,personas, url,precioXnoche) {
        this.nombre= nombre, 
        this.rooms = rooms , 
        this.personas = personas,
        this.url = url,
        this.precioXnoche = precioXnoche
    }
    }      
/********************  CREACION DE OBJETOS DEPARTAMENTOS ******************/

const cozy1 = new Departamento ( "Cozy I",2 ,4, "./images/cozy II.jpg", 8000);
const cozy2 = new Departamento ( "Cozy II",3 ,3, "./images/cozy II.jpg", 7000);
const cozy3 = new Departamento ( "Cozy III",1 ,2, "./images/cozy II.jpg",6000);    

const arrayDepartamentos  = [cozy1 , cozy2, cozy3]; 


/******************* HTML DINAMICO: DEPARTAMENTO OPCIONES *****************/

const departamentosContenedor =document.getElementById ("departamentosOpciones"); 

const departamentosOpciones = () => {
arrayDepartamentos.forEach(departamento => {
        const div = document.createElement("div"); 
        div.className =  "container caja departamentosContenedor--label  " ;
        div.innerHTML = `   
                            <div class= "container text-center">
                                <h2 class= "text-center" > ${departamento.nombre} </h2>
                            <div>
                                    <img class= "dptoImg" src= "${departamento.url}">
                                    <p>Habitaciones: ${departamento.rooms} </p>
                                    <p>Personas Max: ${departamento.personas} </p>
                                    <p>Precio Noche: $ ${departamento.precioXnoche} </p>
                                    <button    id="boton${departamento.personas}" class="button--seleccion "> Seleccionar</button>
                                    </div>
                            </div>
                            `
                            departamentosContenedor.appendChild (div);
/*AGREGAR DATOS A LA RESERVA */
        const boton = document.getElementById(`boton${departamento.personas}`);
boton.addEventListener("click", () => {
    Swal.fire({
        title: 'Seleccionado',
        icon: 'success',
        timer: '1500',
        iconColor:'#995a9fc8',
        showConfirmButton: false,
      })
  agregarReserva(departamento.personas);
        })
    })
}
departamentosOpciones();
/* FUNCION PARA AGREGAR A LA RESERVA EL DPTO SELECCIONADO POR EL USUARIO*/
function agregarReserva(personas) {
    const dptoAsignado = arrayDepartamentos.find(departamento => departamento.personas == personas);
    if (dptoAsignado) {
        reservaUsuario.push(dptoAsignado);
        //console.log(reservaUsuario);
        
        //console.log(dptoAsignado)
    }
}

function calculardiasDiscount() {
    const timeStart = new Date(document.getElementById("checkIn").value);
    const timeEnd = new Date(document.getElementById("checkOut").value);
    const actualDate = new Date();
    if (timeEnd > timeStart)
    {
        const diff = timeEnd.getTime() - timeStart.getTime();
        document.getElementById("noches").value = Math.round(diff / (1000 * 60 * 60 * 24));
    }
    else if (timeEnd != null && timeEnd < timeStart) {
        Swal.fire ({
            icon:'warning',
            text: 'La fecha final de la estadia debe ser mayor a la fecha inicial',
            width:'500px'
        });
        document.getElementById("noches").value = 0;


    }

}


    /* FUNCION PARA OBTENER DATOS INGRESADOS POR EL USUARIO */
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();


        const personas = document.getElementById("personas");
        const nombre = document.getElementById("nombre");
        const noches = document.getElementById("noches");
        const checkIn = document.getElementById("checkIn");
        const checkOut = document.getElementById("checkOut");
        const solicitud = document.getElementById("solicitud");

        const reserva = new Reserva(personas.value, nombre.value, noches.value, checkIn.value, checkOut.value, solicitud.value);
        reservaUsuario.push(reserva);
        formulario.reset();
        ;

        const booking = JSON.stringify(reservaUsuario);

        console.log(booking);
        localStorage.setItem("booking", booking);
        console.log(reservaUsuario);
       // console.log(reserva); 

/*FUNCION QUE CALCULA EL PRECIO TOTAL DE LA RESERVA */ 

function precioTotalAPagar () {

        const totalNoches = (reserva.noches);
        const precioDpto = (reservaUsuario[0].precioXnoche);
return (totalNoches * precioDpto);

}



/* FUNCION PARA AGREGAR RESERVA REALIZADA POR EL CLIENTE AL HTML*/
      
const reservaContainer = document.getElementById("reserva");
const verReserva = document.getElementById("formulario");
        verReserva.addEventListener("click", () => {
            carrito();
        });



        const carrito = () => {
            const div = document.createElement("div");
            div.className = "container reservaContainer";
            div.innerHTML = `
                        <hr>
                        <div class ="container text-star">

                                <h3  >Tu Reserva</h3>
                                <h3 class = "text-center"> ${reserva.saludar()}  </h3>
                                <p> Nombre y Apellido: ${reserva.nombre} </p>
                                <p> Noches: ${reserva.noches} </p>
                                <p> CheckIN: ${reserva.checkIn} </p>
                                <p> CheckOut: ${reserva.checkOut} </p>
                                <p> Solicitud: ${reserva.solicitud} </p>
                                <p> Departamento: ${reservaUsuario[0].nombre} </p>
                                <p> Precio Noche: $ ${reservaUsuario[0].precioXnoche} </p>
                                <p> Precio Total: $ ${precioTotalAPagar()} </p>
                                <button class = "btn button--seleccion " id="modificar" > Modificar Reserva</button $> <hr>
                                <button class = "btn button--seleccion" id="eliminarReserva" > Cancelar Reserva</button>
                            
                        </div>`;
            reservaContainer.appendChild(div);

const eliminarReserva = document.getElementById ("eliminarReserva");
   eliminarReserva.addEventListener ("click" , () =>  {

    Swal.fire({
        title: 'Estas seguro que quieres eliminar la Reserva?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cancelar la Reserva!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminada!',
            'Tu Reserva fue eliminada, esperamos verte pronto.',
            'success'
          ,  vaciarReserva()  )
        }  
      })
    
   
    } )
}
})

const vaciarReserva = () => { 

    reservaUsuario = []; 
   console.log(reservaUsuario);
   
}

	/* MODIFICAR RESERVA */ 
// TENGO QUE ACCEDER AL ARRAY 'RESERVAUSUARIO' 0 DEPARTAMENTO 1 PERSONA 
//TRAER EL FORMULARIO CON LOS DATOS Y LUEGO APRETAR ACEPTAR PARA GUARDAR LOS NUEVOS DATOS 
//

    /* CANCELAR RESERVA */ 




    //CLEAR EL ARRAY 'RESERVAUSUARIO'




//This code defines a function agregarReserva that adds a new booking to an array called reservaUsuario. The function first finds a department from an array called arrayDepartamentos that can accommodate the number of personas specified in the booking. If a department is found, the function creates a new Reserva object using the form data submitted by the user and adds it to the reservaUsuario. Finally, the function converts the reservaUsuario to JSON and stores it in the browser's local storage.

//There is also an event listener attached to a form with ID formulario that listens for form submission. When the form is submitted, it creates a new Reserva object and adds it to the reservaUsuario. It then calls the carrito function to display the new booking in the HTML.

//The carrito function creates a new div element and appends it to the reservaContainer element in the HTML. The div displays the details of the new booking, including the department assigned to the booking and the price per night for that department. There are also two buttons that allow the user to modify or cancel the booking.

//Note that the code contains some comments that provide additional information about what the code is doing.

