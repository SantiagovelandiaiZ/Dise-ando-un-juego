# GALACTUS ARENA — React Native / Expo SDK 57

**Desarrollador:** Santiago Velandia Isaza  
**Tipo:** juego de combate por turnos para Android  
**Inspiración:** adaptación móvil del proyecto web entregado `html7(1).rar`, conservando Galactus y sus animaciones.

## Concepto y mecánica

El jugador debe derrotar a Galactus reduciendo sus puntos de vida (PV) de 100 a 0 antes de que el jefe reduzca los PV del jugador a 0.

- **Corte infernal:** inflige 20 puntos de daño.
- **Rostizar:** inflige 30 puntos de daño.
- **Zarpazo triple:** inflige 40 puntos de daño.
- **Halo de curación:** se puede usar una sola vez y recupera hasta 35 PV. Galactus contraataca después de cada acción.
- **Victoria:** Galactus llega a 0 PV. **Derrota:** el jugador llega a 0 PV.
- Los contraataques del jefe varían para que las partidas no sean idénticas. El botón de volver a jugar reinicia todos los valores.

## Requisitos

- Node.js **22.13 o superior** (requisito de Expo SDK 57).
- npm, un teléfono Android y Expo Go compatible con SDK 57, o Android Studio/emulador.
- Conexión a Internet para instalar dependencias y arrancar Expo por primera vez.

## Ejecutar localmente

1. Descomprime `GalactusArena.zip` en una carpeta, por ejemplo `C:\Proyectos\GalactusArena`.
2. Abre esa carpeta en Visual Studio Code.
3. Abre una terminal dentro de la carpeta del proyecto.
4. Comprueba versiones con `node -v` y `npm -v`. Si Node es anterior a 22.13, instala una versión compatible.
5. Instala dependencias:
   ```bash
   npm install
   ```
6. Inicia Expo:
   ```bash
   npx expo start
   ```
7. En Android, abre Expo Go compatible con SDK 57 y escanea el QR. El móvil y el computador deben estar en la misma red Wi-Fi. Si la red bloquea la conexión, prueba `npx expo start --tunnel`.
8. Para probar en un emulador Android con Android Studio, inicia el emulador y ejecuta `npm run android`.

### Importante sobre Expo Go 57

El proyecto está fijado a Expo SDK 57 (React Native 0.86). Debes usar una versión de Expo Go que admita SDK 57. Si la versión instalada desde la tienda no coincide, no se podrá abrir directamente en ella; sigue las instrucciones oficiales de Expo para obtener la versión compatible o usa un development build.

## Crear el APK

El ZIP contiene el proyecto fuente, no un APK ya compilado. La compilación de Android requiere instalar las dependencias y autenticarse con una cuenta de Expo/EAS.

1. Instala EAS CLI:
   ```bash
   npm install -g eas-cli
   ```
2. Inicia sesión:
   ```bash
   eas login
   ```
3. Desde la carpeta del proyecto, configura EAS si lo solicita:
   ```bash
   eas build:configure
   ```
4. Genera un APK instalable para pruebas:
   ```bash
   eas build --platform android --profile preview
   ```
5. Cuando el servicio termine, abre el enlace de compilación que te muestre EAS y descarga el `.apk`. Instálalo en tu teléfono Android y, para entregar la actividad, súbelo a la plataforma que indique el profesor.

El APK no se puede fabricar desde este ZIP sin ejecutar la compilación de Android; EAS realiza ese paso en sus servidores. No compartas contraseñas ni tokens en el proyecto.
