<div align="center">
  <img src="client/src/assets/images/logo-dating-lab.svg" alt="Logo del proyecto" width="200"/>
</div>


En el bootcamp de fullstack que estamos realizando en FemCoders , se nos brindó la oportunidad de trabajar en un emocionante proyecto junto a un cliente real. Nuestra misión es desarrollar una plataforma web que permitiera a las personas conectarse a través de sus sentidos, explorar eventos y descubrir afinidades compartidas.

## Sobre este proyecto
Al acceder a la página, los usuarios son recibidos con una intrigante introducción centrada en la búsqueda de su pareja ideal a través de la conexión sensorial. El primer paso es completar un formulario que evalúa la compatibilidad con otros usuarios, proporcionando valiosas recomendaciones de coincidencias. Luego, se les brinda la emocionante oportunidad de asistir a eventos sensoriales exclusivos, donde pueden conocer en persona a sus posibles coincidencias y vivir una experiencia única. Para acceder a estos eventos, los usuarios tienen la opción de pagar por eventos individuales o suscribirse a una membresía mensual a esta experiencia sensorial única.

## Objetivo del Proyecto
Una web responsive donde se pueda gestionar usuarios tanto registrados, como no, para que puedan ver de que se trata la pagina, y decidir si les interesa sumergirse en un espacio donde aparte de conocer a tu pareja ideal, podras experimentiar eventos únicos donde pasarla bien y conocer gente con los que compartas tus mismos gustos.


### 🛠 Tecnologías Utilizadas
<div>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" /> 
<img src="https://raw.githubusercontent.com/jmnote/z-icons/master/svg/php.svg" alt="php" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/mysql-original-wordmark.svg" alt="react" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/laravel-plain-wordmark.svg" alt="Laravel" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" width="40" height="40" />
<img  src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" width="40" height="50" /> 
</div>

### 🛠 Herramientas Utilizadas
<div>
<img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/>
<img src="https://w7.pngwing.com/pngs/512/824/png-transparent-visual-studio-code-hd-logo-thumbnail.png" alt="vscode" width="40" heigth="40"/>
<img src="https://w7.pngwing.com/pngs/115/721/png-transparent-trello-social-icons-icon.png" alt="trello" width="40" heigth="40"/>
<img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>
<img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" width="40" heigth="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/xampp.png" alt="xampp" width="40" height="40"/>
<img src="https://www.pngkey.com/png/detail/802-8025481_mamp-mamp-icon.png" alt="mamp" width="40" height="40"/>
<img src="https://res.cloudinary.com/postman/image/upload/t_team_logo/v1629869194/team/2893aede23f01bfcbd2319326bc96a6ed0524eba759745ed6d73405a3a8b67a8" alt="postman" width="40" height="40"/>
</div>

### 🛠 Otros paquetes utilizados
<div>
<img src="https://miro.medium.com/v2/resize:fit:640/0*r3O0lVqhmhgql4Co.png" alt="Sanctum" width="60" height="40"/>
<img src="https://spatie.be/images/og-image.jpg" alt="spatie" width="60" height="40"/>
</div>

### Instrucciones de Uso
Para aprovechar al máximo esta versión del proyecto, es fundamental seguir cuidadosamente las instrucciones de instalación tanto para el frontend como para el backend. Antes de continuar, asegúrate de contar con los siguientes requisitos previos:

+ Conocimientos en Mamp/Xamp: Para ejecutar este proyecto de manera efectiva, es imprescindible tener un buen entendimiento de cómo funcionan entornos de desarrollo como Mamp o Xamp. Estos son sistemas que proporcionan un servidor web local, una base de datos y otros servicios necesarios para ejecutar aplicaciones web. Si no estás familiarizado con Mamp o Xamp, te recomendamos adquirir conocimientos básicos antes de continuar.

+ Composer instalado: es una herramienta esencial para gestionar las dependencias de PHP en tu proyecto. Asegúrate de que Composer esté instalado en tu sistema antes de proceder. Si no lo tienes instalado, puedes encontrar instrucciones detalladas en https://getcomposer.org/ para instalarlo.

+ Conocimientos en MySQL: Debes estar familiarizado con la creación de bases de datos para aprovechar al máximo las funcionalidades del proyecto.

A continuación, se detallan los pasos para la instalación:

**Instalación del Proyecto Backend Laravel**
 1. Clona el repositorio de Laravel desde GitHut
 `https://github.com/thedatinglabbcn/thedatinglab.git`
 2. Abre el proyecto en tu editor de código y en la terminal ingresa al directorio del proyecto
 `cd server`
 3. Instala las dependencias de Composer
 `composer install`
 4. Crea un archivo .env a partir del archivo .env.example.
 5. Crea tú base de datos en mysql con el nombre de tú preferencia.
 6. Configura la base de datos en el archivo .env con la información adecuada, donde debes poner el nombre de tu base de datos previamente creada en mysql y tener claro cual es tu sistema operativo para la instalación.Ejemplo:
 <pre>
<code>
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_base_de_datos
DB_USERNAME=nombre_usuario
DB_PASSWORD=contraseña
</code>
</pre>
7. Ejecuta las migraciones para crear las tablas de la base de datos
`php artisan migrate`
8. Inicia el servidor de desarrollo
`php artisan serve`

**Instalación del Proyecto Frontend React**

1. ingresa al directorio del proyecto
 `cd client`
2. Instala las dependencias de npm
`npm install`
3. Inicia el proyecto
`npm start`
4. El frontend de React ahora está en funcionamiento y se ejecuta en 
`http://localhost:3000`

## Developers
<div align="center" border-radius="50%">
  <img src="https://avatars.githubusercontent.com/u/96080945?v=4" width="100"/><br>
  <sub>Jeaneth Sánchez Núñez</sub>
</div>

<div align="center" border-radius="50%">
  <img src="https://avatars.githubusercontent.com/u/977203?v=4" width="100"/><br>
  <sub>Rosa Rubio</sub>
</div>

<div align="center" border-radius="50%">
  <img src="https://avatars.githubusercontent.com/u/132340917?v=4" width="100"/><br>
  <sub>Denise Khurlopian</sub>
</div>

<div align="center" border-radius="50%">
  <img src="https://avatars.githubusercontent.com/u/129850727?v=4" width="100"/><br>
  <sub>Florencia Bordon</sub>
</div>

