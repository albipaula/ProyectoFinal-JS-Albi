

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
                                    <img class= "dptoImg" id= "imgdpto" src= "${departamento.url}">
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
     if (timeStart != null && timeStart < actualDate) {
        Swal.fire ({
            icon:'error',
            text: 'La fecha inicial de la estadia no debe ser menor que la fecha actual',
            width:'500px'
        })}
    else if (timeEnd != null && timeEnd < timeStart) {
        Swal.fire ({
            icon:'error',
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
                        <div class ="container text-star card">

                                <h3  >Tu Reserva</h3>
                                <h3 class = "text-center"> ${reserva.saludar()}  </h3>
                                <p> Nombre y Apellido: ${reserva.nombre} </p>
                                <p> Noches: ${reserva.noches} </p>
                                <p> CheckIN: ${reserva.checkIn} </p>
                                <p> CheckOut: ${reserva.checkOut} </p>
                                <p> Solicitud: ${reserva.solicitud} </p>
                                <p> Departamento: ${reservaUsuario[0].nombre} </p>
                                <p> Precio Noche: $ ${reservaUsuario[0].precioXnoche} </p>
                                <p id= "precioTotalAPAgar"> Precio Total: $ ${precioTotalAPagar()} </p>
                                <button class = "btn button--seleccion" id="eliminarReserva" > Cancelar Reserva</button>
                            
                        </div>`;
            reservaContainer.appendChild(div);

const eliminarReserva = document.getElementById ("eliminarReserva");
   eliminarReserva.addEventListener ("click" , () =>  {

    Swal.fire({
        title: 'Estas seguro que quieres eliminar la Reserva?',
      
        
        showCancelButton: true,
        
        confirmButtonColor: 'purple',
        cancelButtonColor: 'purple',
        confirmButtonText: 'Si, cancelar la Reserva!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            text:'Eliminada!',
            iconColor:'#995a9fc8',
            text:'Tu Reserva fue eliminada, esperamos verte pronto.',
            icon:'success'
            } ,vaciarReserva(), refresh()  )
        }  
      }) 
    } )
     } 
    })

    /* CANCELAR RESERVA */ 
const vaciarReserva = () => { 

    reservaUsuario = []; 
   console.log(reservaUsuario);
   
}


/* FETCH */ 

const criptoYa = "https://criptoya.com/api/dolar";

const precioDolar = document.getElementById("precioDolar");

setInterval( () => {
    fetch(criptoYa)
        .then(response => response.json())
        .then(({blue, oficial}) => {
            precioDolar.innerHTML = `
                <p id= "dolarOficial"> Dolar oficial: $ ${oficial} </p>
                <p id="dolarTurista"> Dolar Turista:  $ ${blue} </p>
            `
           /*  const pesos = document.getElementById ("precioTotalAPAgar")
            const dolarTurista = document.getElementById ("dolarTurista");
            precioEnDolares (pesos , dolarTurista)
            console.log ( pesos  );
            console.log ( dolarTurista)
        */
        })
        .catch(error => console.error(error))


}, 3000)


function refresh () { 

const refreshing = document.getElementById ("imgPortada") 
const div = document.createElement("div");
            div.className = "container reservaContainer";
            div.innerHTML = `
                       <p> ${refreshing} </p>
                        <img> ./images/portada.jpeg
  ` }