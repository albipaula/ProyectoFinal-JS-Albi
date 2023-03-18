
/******************************  SLIDES IMAGENES PORTADA *********************************/
let contador= 0;
let images=  [ "./images/cozy II.jpg ", "./images/cozy III.jpg" ,"./images/portada.jpg" , "./images/cozy II.jpg ","./images/cozy I.jpg ","./images/mendoza.jpg "]; 

setTimeout( ()  => { progress()  }, 4000 );


function progress() {
    if (contador < 6) {  
       document.images[0].src= images[contador];
       contador++;
       setTimeout("progress()",4000);
    }
 }
/******************************  CLASES  *********************************/

class Reserva {
    constructor (personas,nombre,noches,checkIn, checkOut,comentario ){ 

        this.personas = personas;
        this.nombre = nombre;
        this.noches = noches;
        this.checkIn= checkIn;
        this.checkOut= checkOut;
        this.comentario = comentario
        
    }

    saludar () { return ( `Gracias ${this.nombre}, tu reserva fue realizada con EXITO! `)} 

    }

let reservaUsuario = [];

// obtener el booking desde el local storage

if(localStorage.getItem("booking")){
    booking = JSON.parse(localStorage.getItem("booking"));

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

const cozy1 = new Departamento ( "Cozy I",2 ,4, "./images/cozy I.jpg", 8000);
const cozy2 = new Departamento ( "Cozy II",3 ,3, "./images/cozy II.jpg", 7000);
const cozy3 = new Departamento ( "Cozy III",1 ,2, "./images/cozy III.jpg",6000);    

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
                            
/****************************** SELECCION DE DEPARTAMENTO A LA RESERVA ******************************/

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

/****************************** SE AGREGAN LAS OPCIONES DE DEPARTAMENTOS AL DOM ******************************/

departamentosOpciones();

/****************************** FUNCION PARA AGREGAR A LA RESERVA EL DPTO SELECCIONADO POR EL USUARIO******************************/
function agregarReserva(personas) {
    const dptoAsignado = arrayDepartamentos.find(departamento => departamento.personas == personas);
    if (dptoAsignado) {
        reservaUsuario.push(dptoAsignado);
        //console.log(reservaUsuario);
        
        console.log(dptoAsignado)
    }
}



/****************************** FUNCION PARA CALCULAR DIAS ******************************/
function calculardiasDiscount() {
    const checkIn = new Date(document.getElementById("checkIn").value);
    const checkOut = new Date(document.getElementById("checkOut").value);
    const fechaActual = new Date();
    if (checkOut > checkIn )
    {
        const diff = checkOut.getTime() - checkIn.getTime();
        document.getElementById("noches").value = Math.round(diff / (1000 * 60 * 60 * 24));
    } 
     if ( checkIn < fechaActual) {
        Swal.fire ({
            icon:'error',
            text: 'La fecha inicial de la estadia no debe ser menor que la fecha actual . Las reservas deben realizarse con al menos 24hs de anticipacion ' ,
            width:'1000px'
        })}
    else if ( checkOut < checkIn) {
        Swal.fire ({
            icon:'error',
            text: 'La fecha final de la estadia debe ser mayor a la fecha inicial',
            width:'500px'
        });
        document.getElementById("noches").value = 0;
    }}

/******************************FUNCION QUE CALCULA EL PRECIO TOTAL DE LA RESERVA ******************************/ 
const precioTotalAPagar = () => {
    const precioDpto = (reservaUsuario[0].precioXnoche);
    const totalNoches = (reservaUsuario[1].noches);
    
   
return (totalNoches * precioDpto);

};


/****************************** FUNCION PARA OBTENER DATOS INGRESADOS POR EL USUARIO ******************************/

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();


        const personas = document.getElementById("personas");
        const nombre = document.getElementById("nombre");
        const noches = document.getElementById("noches");
        const checkIn = document.getElementById("checkIn");
        const checkOut = document.getElementById("checkOut");
        const comentario = document.getElementById("comentario");

        const reserva = new Reserva(personas.value, nombre.value, noches.value, checkIn.value, checkOut.value, comentario.value);
        reservaUsuario.push(reserva);
        formulario.reset();
        

        const booking = JSON.stringify(reservaUsuario);

        console.log(booking);
        localStorage.setItem("booking", booking);
       // console.log(reservaUsuario);
       // console.log(reserva); 

/****************************** FUNCION PARA AGREGAR RESERVA REALIZADA POR EL CLIENTE AL HTML******************************/


const reservaContainer = document.getElementById("reserva");
const reservaFormulario = document.getElementById("formulario");
        reservaFormulario.addEventListener("click", () => {
            carrito();
        });


/****************************** FUNCION PARA CREAR RESERVA *****************************/

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
                                <p> comentario: ${reserva.comentario} </p>
                                <p> Departamento: ${reservaUsuario[0].nombre} </p>
                                <p> Precio Noche: $ ${reservaUsuario[0].precioXnoche} </p>
                                <p id= "precioTotalAPAgar"> Precio Total: $ ${precioTotalAPagar()} </p>
                                <button class = "btn button--seleccion" id="eliminarReserva" > Cancelar Reserva</button>
                                <button class = "btn button--seleccion" id="cerrar" > Cerrar</button>
                            
                        </div>`;
            reservaContainer.appendChild(div);
 
  
eliminarReserva();
   
cerrarReserva()
} 
    })




/****************************** FUNCION PARA ELIMINAR RESERVA ******************************/

function eliminarReserva () {
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
            } ,vaciarReserva(),  setTimeout( ()  => { location.reload()  }, 4000 ))
        }  
      }  ) 
    } )}
  /****************************** FUNCION PARA CANCELAR RESERVA******************************/

const vaciarReserva = () => { 

    reservaUsuario = []; 
    localStorage.clear();
    console.log(reservaUsuario);
};
 /****************************** CERRAR RESERVA ******************************/ 
function cerrarReserva () { const cerrarReserva = document.getElementById ("cerrar");
 cerrarReserva.addEventListener ( "click", ()=> {

  Swal.fire({
      title: 'Gracias por tu compra'
      } , setTimeout( ()  => { location.reload()  }, 1500 ))

 } )}; 


/************************** FETCH **************************/ 

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
    
   
        })

        
        .catch(error => console.error(error))
    
}, 3000)


