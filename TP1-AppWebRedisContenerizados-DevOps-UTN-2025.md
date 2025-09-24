

# **Trabajo Practico 1: Aplicación web y servicio Redis contenerizados** {#trabajo-practico-1:-aplicación-web-y-servicio-redis-contenerizados}

DevOps | UTN FRRe | 2025

[Trabajo Practico 1: Aplicación web y servicio Redis contenerizados](#trabajo-practico-1:-aplicación-web-y-servicio-redis-contenerizados)

[Objetivo del Trabajo Práctico](#objetivo-del-trabajo-práctico)

[Introducción al escenario](#introducción-al-escenario)

[Pautas](#pautas)

[Entregables](#entregables)

[Fecha de Entrega](#fecha-de-entrega)

[Requerimientos Funcionales](#requerimientos-funcionales)

[App web](#app-web)

[API](#api)

[Redis](#redis)

[Rúbrica](#rúbrica)

## Objetivo del Trabajo Práctico {#objetivo-del-trabajo-práctico}

El presente trabajo práctico tiene como objetivo que los estudiantes apliquen los conocimientos de contenedores y bases de datos en memoria, así como el uso de herramientas modernas para la integración de servicios y gestión de aplicaciones contenerizadas.

## Introducción al escenario {#introducción-al-escenario}

El objetivo de este trabajo es desarrollar una aplicación web que se conecte vía API a un servidor Redis para guardar y recuperar información, por ejemplo que gestione una lista de "Tareas por Hacer" (ToDo) utilizando el lenguaje de programación elegido por el grupo de alumnos. La aplicación web y API deberán estar contenerizadas y conectarse a un servicio de caché Redis, también dentro de un contenedor. Los servicios (la aplicación y Redis) se gestionarán a través de Docker Compose o similar. El sistema permitirá enviar y recibir información entre la aplicación web y el servidor de Redis, cumpliendo con los principios básicos de integración de servicios.

## 

## Pautas {#pautas}

1. El presente trabajo práctico se realiza en grupos de hasta 2 o 3 personas  
2. El siguiente trabajo práctico tiene nota grupal (el código es grupal y el coloquio personal)  
3. Se debe poder crear un repositorio grupal en Github (se entrega enlace al repositorio)  
4. En el presente documento se presentan los requerimientos funcionales y técnicos  
5. La rúbrica tiene una suma 100 puntos (nota 10 diez)

## Entregables {#entregables}

1. Aplicación funcionando (durante el coloquio)  
2. Coloquio grupal para presentar defender el trabajo  
3. Enlace al repositorio grupal en Github   
4. Desplegar en ambiente de cloud (utilizar cualquier servicio que el grupo crea adecuado, pero que se despliegue desde una Registry de imágenes, ejemplo Docker Hub, GitLab Registry, etc.)  
5. Un informe o presentación que resuma los resultados obtenidos, dificultades encontradas, y posibles mejoras para el futuro.

## Fecha de Entrega {#fecha-de-entrega}

Fecha de Entrega Lunes 29/Septiembre (Coloquio Grupal)

## Requerimientos Funcionales {#requerimientos-funcionales}

La aplicación consta de una App Web, una API y un servidor Redis

### App web {#app-web}

Crear una aplicación web: desde esta aplicación se consumirá los datos expuestos por la API.   
La aplicación puede desarrollarse en el lenguaje de programación que elijan.  
Pueden apoyarse en IA para acelerar el desarrollo de la app.  
Se recomienda un ejemplo sencillo, como una ToDo List, para probar la comunicación entre la web, la API y Redis.  
Ejemplo:  
*Desarrollar una aplicación que gestione una lista de tareas "ToDo".*   
*La aplicación debe permitir agregar, eliminar y marcar como completadas las tareas.*  
La aplicación estará contenerizada (puede utilizar Docker o PodMan)   
La aplicación debe ser capaz de enviar información al servidor Redis (por ejemplo, agregar o modificar tareas en caché). También debe poder recuperar información desde Redis (como cargar la lista de tareas desde la caché).

### API {#api}

Servicio web que exponga una API Rest (o puede ser otro tipo de API como gRPC). Este servicio es el único que tiene acceso al Redis

### Redis {#redis}

Debe estar contenerizado y será accesible desde la aplicación web.  
Redis será utilizado como caché para almacenar y recuperar información, como el estado de las tareas o información relevante de la sesión.

## Rúbrica {#rúbrica}

|  | \[Grupal\]Apps Funcionando(local o nube) | \[Grupal\]Visualización de variables en Redis | \[Grupal\]Utilización de Github actions para publicar imagen en Registry | \[Grupal\]App funcionando en servicio externo | \[Personal\]Coloquio presentación |
| :---- | ----- | ----- | ----- | ----- | ----- |
| **Puntos** | **30** | **10** | **30** | **20** | **10** |

| Entrega Excelente (100%) | Se aborda el tema. Se presenta la idea y se profundiza la misma o agregando valor. La entrega se realiza en tiempo y forma. El trabajo está estructurado y completado al 100\. Se detalla en el coloquio de principio a fin el proceso completo y los problemas en el mismo. Se extendió lo que se propuso como TP. Se mejoró tareas previamente realizadas. El trabajo se presentó con todos los lineamientos propuestos. |  |  |  |  |  |  |
| :---- | :---- | ----- | ----- | ----- | ----- | ----- | ----- |
| Terminado Satisfactorio (80%) | Se aborda el tema, pero se encuentra en un 75% el punto abordado. La entrega se realiza pero existen puntos faltantes para completar la idea de la funcionalidad requerida. Se entrega en tiempo y forma. No se extendió en lo que se propuso como ideas en el TP. El trabajo o item falto algunos puntos a tener en cuenta para completarlo. |  |  |  |  |  |  |
| Basico (60%) | Se aborda el tema pero con un nivel escaso de comprensión y de realización. Se encuentra realizado al 50% del ítem solicitado. No se extendió en mejorar o perfeccionar. Se encuentra deficiente la organización del trabajo. No se detalla en el coloquio parte del ítem o se argumenta. No se presentan todos los lineamientos propuestos para el ítem. |  |  |  |  |  |  |
| No realizado/Escaso (0%) | Solo se menciona el tema o no se aborda. No presenta información relacionada al ítem solicitado. O se realizó pero con error en el abordaje para su funcionamiento o publicación. No se estructuró el trabajo. La entrega no se realizó en tiempo y forma |  |  |  |  |  |  |

