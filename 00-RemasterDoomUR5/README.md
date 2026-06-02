<div align="center">
  <img src="https://img.icons8.com/color/96/000000/unreal-engine.png" alt="Unreal Engine Icon">
  <h1>Remasterización de DOOM (1993) en Unreal Engine 5</h1>
  <p><i>Recreación técnica y visual de los dos primeros niveles del clásico shooter en primera persona utilizando las últimas tecnologías de desarrollo de videojuegos.</i></p>

  <a href="https://www.unrealengine.com/"><img src="https://img.shields.io/badge/Unreal_Engine-5.0+-313131?style=flat&logo=unrealengine&logoColor=white" alt="Unreal Engine 5"></a>
  <a href="#"><img src="https://img.shields.io/badge/Blueprints-Visual_Scripting-2496ED?style=flat" alt="Blueprints"></a>
  <a href="#"><img src="https://img.shields.io/badge/Level_Design-Blockout-FF4B4B?style=flat" alt="Level Design"></a>
  <a href="#"><img src="https://img.shields.io/badge/Game_AI-Behavior_Trees-4CAF50?style=flat" alt="Artificial Intelligence"></a>
</div>

---

## 🎮 Sobre el Proyecto

Este proyecto nació con el objetivo de estudiar a fondo los fundamentos del **Game Design** y la **Programación Gameplay** en motores modernos. Para ello, me propuse el ambicioso reto de recrear con la mayor fidelidad posible los dos primeros niveles del mítico **DOOM (1993)**, trasladando un juego clásico basado en sprites 2D a un entorno completamente 3D en **Unreal Engine 5**.

El desarrollo se enfocó no solo en replicar la arquitectura de los niveles, sino en reprogramar desde cero las físicas del jugador, la balística de las armas, los sistemas de recolección de objetos y la Inteligencia Artificial (IA) de los enemigos utilizando NavMesh y Behavior Trees.

---

## 📽️ Diario de Desarrollo (Videoblog)

A lo largo del proyecto, he ido documentando mi progreso en **6 fases de desarrollo** en formato vídeo. A continuación puedes ver la evolución gráfica y técnica del juego desde los primeros polígonos hasta el resultado final.

*(Haz clic en las imágenes para ver el vídeo demostrativo de cada fase en YouTube)*

### 🏗️ Fase 1: Blockout y Estructura Base
En esta fase inicial, el objetivo fue importar los planos originales del nivel E1M1 de DOOM y construir toda la geometría básica (Blockout). Aquí se definen las proporciones, pasillos y salas clave sin texturas para asegurar que el flujo del nivel (*flow*) se siente correcto.

[![Fase 1](https://img.youtube.com/vi/gsX6vk6bzFo/hqdefault.jpg)](https://youtu.be/gsX6vk6bzFo)

### 🏃‍♂️ Fase 2: Controlador del Personaje y Movimiento
Desarrollo del `Character Controller`. Se implementó la cámara en primera persona y se ajustaron las físicas de movimiento (velocidad, inercia) para emular la agilidad frenética tan característica del Doom original.

[![Fase 2](https://img.youtube.com/vi/66SVgaC9y_o/hqdefault.jpg)](https://youtu.be/66SVgaC9y_o)

### 🔫 Fase 3: Mecánicas de Disparo y Armas
Programación de la lógica de armamento mediante *Blueprints*. Se añadieron las armas icónicas, sistemas de *Raycasting* (Hitscan) e instanciación de proyectiles para simular el daño. También se añadieron los primeros efectos de partículas y sonido de los disparos.

[![Fase 3](https://img.youtube.com/vi/5ZjQVXDtT5o/hqdefault.jpg)](https://youtu.be/5ZjQVXDtT5o)

### 🤖 Fase 4: Inteligencia Artificial (Enemigos)
Una de las partes más complejas. Se implementó el **NavMesh** para que los enemigos pudieran moverse por el mapa esquivando obstáculos. Mediante *Behavior Trees* y *Blackboards*, se dotó a los monstruos de rutinas de patrullaje, detección del jugador (visión) y persecución/ataque.

[![Fase 4](https://img.youtube.com/vi/cyKU1-NJMzQ/hqdefault.jpg)](https://youtu.be/cyKU1-NJMzQ)

### 🎒 Fase 5: Pickups, Interfaz y Lógica de Puertas
Se integró todo el sistema interactivo del escenario. Esto incluye la recogida de botiquines (Health), escudos (Armor) y munición. También se programaron los sistemas de puertas que requieren llaves de colores (Keycards) y la Interfaz de Usuario (HUD) en pantalla mostrando la vida del jugador.

[![Fase 5](https://img.youtube.com/vi/x8I2urG0LDQ/hqdefault.jpg)](https://youtu.be/x8I2urG0LDQ)

### ✨ Fase 6: Pulido, Iluminación y Gameplay Final
La fase de texturizado e iluminación. Se aplicaron materiales fieles a la obra original, se ajustaron las luces puntuales para dar esa atmósfera oscura de terror, y se pulieron todos los bugs para conseguir un *gameplay loop* fluido y divertido, uniendo el nivel 1 con el nivel 2.

[![Fase 6](https://img.youtube.com/vi/2eew1G4ZhQQ/hqdefault.jpg)](https://youtu.be/2eew1G4ZhQQ)

---

> 💡 **Nota:** Todos los assets 3D, texturas y sonidos pertenecen a *id Software*. Este proyecto fue creado con fines puramente académicos y de aprendizaje, y no tiene ningún fin comercial.
