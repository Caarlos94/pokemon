![HenryLogo](https://images7.alphacoders.com/592/592678.jpg)

# Individual Project - Henry Pokemon

Este es un proyecto basico consumiendo la API https://pokeapi.co/
donde entre sus distintas funcionalidades están: buscar un pokemon por nombre, crear pokemon nuevos,
ordenarlos por nombre o fuerza, filtrarlos por su tipo y mostrar los detalles de cada pokemon.

## Stack de Tecnologías

### Front End:
- HTML, CSS, Javascript, React, Redux.

### Back End:
- Node.js, Express, Sequelize.

### Database:
- PostgreSQL

## Funcionalidades

- Buscar pokemons que hay en la PokeApi.
- Muestra los detalles de cada pokemon en una sección a parte.
- Crear pokemon nuevos a través de un formulario.
- Sistema de ordenamiento por fuerza de ataque y por alfabeto.
- Sistema de filtrado por su tipo o por pokemon creado.

## **Intrucciones para Comenzar** 

__IMPORTANTE:__ Versiones necesarias de Node y NPM 

 * __Node__: 12.18.3 o superior
 * __NPM__: 6.14.16 o superior
 
## BoilerPlate

El boilerPlate tiene dos carpetas: `api` and `client`.

Denteo de `api` se debe crear un archivo llamado `.env` con la siguiente estructura: 
```
DB_USER=postgresuser
DB_PASSWORD=postgrespassword
DB_HOST=localhost
```
Debes reemplazar `postgresuser` y `postgrespassword` por tus propias credeciales para conectar a la base de datos de postgreSQL. Este archivo `.env` será ignorado por github debido a que contene información sensible (las credenciales).

## Posteriormente
### _Conectar con la base de datos_

 - Dirigete a postgreSQL para crear una nueva base de datos lamada `pokemon`, este es el nombre de la base de datos a la cual nos conectaremos.

### _Instala los package necesarios para correr el proyecto_

- Abre la consola del proyecto
    + Dentro de la carpeta `api`, escribe la siguiente linea de comando en la consola `npm install`.
    + Dentro de la carpeta `client`, escribe la siguiente linea de comando en la consola `npm install`.

### _Corre el proyecto_

- Abre la consola del proyecto
    + Dentro de la carpeta `api`, escribe la siguiente linea de comando en la consola `npm start`.
    +  Dentro de la carpeta `client`, escribe la siguiente linea de comando en la consola `npm start`.
    +  Dirigete a  http://localhost:3000/ en tu navegador favorito. 

## Capturas de Pantalla

- Main

![home](https://raw.githubusercontent.com/Caarlos94/pokemon/main/client/src/img/Readme/main-Pokemon.png)

- Home 

![home](https://raw.githubusercontent.com/Caarlos94/pokemon/main/client/src/img/Readme/home-Pokemon.png)

- Busqueda 

![home](https://raw.githubusercontent.com/Caarlos94/pokemon/main/client/src/img/Readme/search-Pokemon.png)

- Formulario para Crear Pokemon

![home](https://raw.githubusercontent.com/Caarlos94/pokemon/main/client/src/img/Readme/create-Pokemon.png)

- Pokemon Creado 

![home](https://raw.githubusercontent.com/Caarlos94/pokemon/main/client/src/img/Readme/created-Pokemon.png)

- Detalle del Pokemon

![home](https://raw.githubusercontent.com/Caarlos94/pokemon/main/client/src/img/Readme/detail-Pokemon.png)
