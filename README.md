<h1>CLÍNICA ONLINE</h1>
Trabajo práctico - Laboratorio IV
En esta aplicación se evalúan todos los mecanismos y conocimientos adquiridos en la cursada de la materia, utilizando código abierto y la documentación Web como bibliografía.
_Este proyecto fue generado con Angular CLI version 10.1.6.

## Sitio de prueba 🚀

https://appc-clinica.herokuapp.com/

### Instalación y ejecución 🔧

_Instalacion de paquetes_

```
ng build
```

_Ejecucion local_

```
ng serve
```

_Ingresa a `http://localhost:4200/` para la prueba local._

## Construido con 🛠️

* [Angular](https://angular.io/docs)
* [Material](https://material.angular.io/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)
* [Firebase](https://firebase.google.com/docs)
* [Fontawesome](https://fontawesome.com/)
* [Typescript](https://www.typescriptlang.org/)

---
## Requerimientos de la Aplicación
Debemos realizar un sistema según las necesidades y deseos del cliente, para eso tenemos unabreve descripción de lo que el cliente nos comenta acerca de su negocio.
La clínica OnLine, especialista en salud, cuenta actualmente con consultorios (6 en la actualidad), dos laboratorios (físicos en la clínica), y una salade espera general. Está abierta al público de lunesa viernes en el horario de 8:00 a 19:00, y lossábados en el horario de 8:00 a 14:00.
Trabajan en ella profesionales de diversas especialidades, que ocupan los consultorios acorde a su disponibilidad, y reciben en ellos pacientes con turno para consulta o tratamiento. Dichos turnos son pedidos por la web seleccionando el profesional o laespecialidad. La duración mínima de un turno es 30 minutos, pero los profesionales pueden cambiar la duración según su especialidad.


## Perfiles de usuarios

♦ <strong> Profesional </strong> Puede tener más de una especialidad y el registro lo hace el profesional, necesitando la aprobación de un administrador para empezar a atender en la clinica.

♦ <strong> Paciente </strong> Ingresa con dos imágenes de perfil y se verifica la dirección de email.

♦ <strong> Administrador </strong> Se carga solamente por otro administrador)además de poder agregar una nueva especialidad en el alta de profesional.
⌨️ _UTN-FRA_ ⌨️

## Registro al portal Web

♦ Podemos registrarnos como Cliente, en donde además de los datos personales se debe cargar obligatoriamente 2 fotos.
 
 <img src="/src/assets/readme/resgistroPaciente.png" alt="">

♦ Podemos registrarnos como Profesional, en donde además de los datos personales se debe cargar obligatoriamente 1 o mas especialidades.

 <img src="/src/assets/readme/registroProfesional.png" alt="">

 ## Ingreso a la Web

 ♦ Una vez verificado nuestro correo electrónico, podremos ingresar con nuestro email y contraseña.

 <img src="/src/assets/readme/login.png" alt="">

 ♦ Al ingresar como paciente se poddrá observar la siguiente pagina de Home. Donde se prodá acceder a la lista de los turnos solicitados por el paciente, y además el apartado para solicitar uno nuevo. 

 <img src="/src/assets/readme/homePaciente.png" alt="">

 <h2> <strong>Listado del lado del Paciente<strong> </h2>
  
 En este apartado nos encontramos con la barra de búsqueda para filtrar nuestros turnos, y ademas contamos con botones, para cancelar el turno de necesitarlo, y otro para obtener mas información del mismo. 

 <img src="/src/assets/readme/listaPaciente.png" alt="">


 ♦ Una vez que seamos antendios vamos a poder completar una brebe encuesta de dicha atención 

 <img src="/src/assets/readme/respuestaPaciente.png" alt="">

  <h2> <strong>Sacar un Turno<strong> </h2>
 
♦ Debemos sleccionar la especialidad a la cual queremos solicitar el turno, luego el profesional pertinente y por último el dia y hora disponible para nuestra solicitud.  

 <img src="/src/assets/readme/turnoEspecialidad.png" alt="">
 <img src="/src/assets/readme/turnoProfesional.png" alt="">
 <img src="/src/assets/readme/turnoFecha.png" alt="">
 <img src="/src/assets/readme/turnoVerif.png" alt="">

<h2> <strong>Home Profesional<strong> </h2>

♦ Desde esta página de inicio podemos acceder a nuestra disponibilidad horaria, donde podremos indicar los dias y horarios de disponibilidad. Y además a la lista de turnos solicitados por los pacientes, donde podremos atenderlos.

 <img src="/src/assets/readme/homeProfesional.png" alt="">

 <h2> <strong>Listado del lado del Profesional<strong> </h2>

 ♦ En este apartado nos encontramos con la barra de búsqueda para filtrar nuestros turnos, y ademas contamos con botones, para Aceptar o rechazasr el turno de ser necesitarlo, y otro para obtener mas información del mismo.

 <img src="/src/assets/readme/listadoProfesional.png" alt="">

♦ Al la hora de antender al paciente nos encontraremos con la siguiente encuenta/historia clínica a completar.

 <img src="/src/assets/readme/encuestaProfesional.png" alt="">

 <h2> <strong>Horarios de Profesional<strong> </h2>

♦ En este apartado nos encontraremos el menu en el cual el Profesional puede agregar o eliminar días y horarios de atención.

 <img src="/src/assets/readme/horaProfesional.png" alt="">


<h2> <strong>Detalle del Turno<strong> </h2>

♦ En el detalle del turno estan disponibles, tanto los datos del paciente como del profesional, además de la historia clínica y los datos de las encuestas.

 <img src="/src/assets/readme/turnoDetalle.png" alt="">


<h2> <strong>Primer Sprint - 22/11<strong> </h2>

## Tareas principales realizadas

♦ Registro y Login con Firebase

♦ Verificación de email para usuarios 

♦ Perfiles de usuarios con rutas autenticadas

♦ Manejos de imágenes 

♦ Proyecto subido a Heroku

<h2> <strong>Segundo Sprint - 29/11<strong> </h2>

♦ Se incorporó Captcha de Google para el registro de usuarios

♦ Funcionalidad de usuarios Admmin para creación de nuevos administradores.

♦ Listado de turnos de cada Paciente con su estado actual.

♦ Alta de turnos.

♦ Funcionalidad para que los profesionales agreguen su disponibilidad.

c Atención de pacientes.

<h2> <strong>Tercer Sprint - 5/11<strong> </h2>

♦ Se agregaron animaciones

♦ Funcion de Atencion de Usuarios.

♦ Fucion de Solicitud de Turnos. 

<h2> <strong>Cuarto Sprint - 12/11<strong> </h2>

♦ Se agregaron animaciones

♦ Corrección de Solicitud de turnos.

♦ Encuesta por parte del apciente luego de ser atendido.

♦ Filtro de turnos, segun los parámetros solicitados


<h2> <strong>Quinto Sprint - 19/11<strong> </h2>

♦ Corrección del filtro de turnos.
♦ Elaboración del Readme.







