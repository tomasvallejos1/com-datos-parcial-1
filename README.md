# 📡 Com Datos — Parcial 1 · Test interactivo

Web de autoevaluación para el **primer parcial de Comunicación de Datos** (UTN FRVT), cubriendo las **Unidades 1, 2 y 3** completas, basada en el resumen de la materia (Stallings, *Data and Computer Communications*, 10ª ed. + PowerPoints de la cátedra).

## ✨ Qué incluye

### 🎯 60 preguntas Multiple Choice
- **40 de nivel medio** y **20 de nivel difícil**
- **20 son de selección múltiple** (varían entre 1, 2 y 3 correctas)
- Las **opciones se mezclan al azar** en cada intento (no hay posición "favorita")
- Incluye **ejercicios numéricos de práctica** estilo campus: Shannon, Nyquist, PCM, dB/SNR, baudios
- Corrección inmediata: te dice si está bien y, si no, **te explica por qué**
- Explicaciones con **simuladores interactivos** (gráficos y animaciones que podés manipular):
  - 🌊 Onda senoidal (amplitud, frecuencia, fase)
  - 📐 Fourier: armar una cuadrada sumando armónicos
  - 🔌 Códigos de línea (NRZ-L, NRZI, AMI, Pseudoternario, Manchester) con tus propios bits
  - 📶 dBm y SNR
  - 🧮 Nyquist vs Shannon
  - ✨ Constelaciones QAM con ruido
  - 🎙️ PCM: muestreo, cuantización y aliasing
  - ⏱️ TDM vs STDM animado
  - 📡 Pérdida en espacio libre (FSPL)
  - 📦 Encapsulamiento TCP/IP paso a paso

### ✍️ 20 preguntas de Desarrollo
- Escribís tu respuesta libre en un campo de texto
- **Corrección automática** por detección de conceptos clave (sin tildes, por palabra completa)
- Te dice si está **correcta (≥60%)**, **parcial (35–59%)** o **incorrecta**, qué conceptos mencionaste y cuáles te faltaron
- Muestra la **respuesta modelo completa**

### 📊 Resultados
- Desglose por unidad, dificultad y tipo de pregunta
- Lista de preguntas falladas con acceso directo para repasarlas
- Nota global simulada (60% MC + 40% desarrollo)
- El progreso se guarda en el navegador (localStorage)

## 🚀 Uso

Es una web estática sin dependencias. Opciones:

- Abrir `index.html` directamente en el navegador, o
- Servirla localmente: `python -m http.server` y entrar a `http://localhost:8000`, o
- Verla publicada con GitHub Pages.

## 📚 Temario cubierto

Alineado con el temario que confirmó la cátedra para el parcial (capítulos 1, 2, 3, 4, 5 y 8 de Stallings):

| Unidad | Temas |
|---|---|
| **U1** | Modelo general de comunicación, tareas, LAN/WAN/MAN, **conmutación de circuitos vs. paquetes**, Internet, arquitectura de protocolos, **encapsulamiento y PDU**, **capas TCP/IP**, **TCP vs. UDP**, **ACK**, **IP vs. MAC**, TTL/IPv6, OSI, Ethernet y CSMA/CD, tráfico elástico/inelástico |
| **U2** | Sentidos de transmisión, datos vs. señales, **amplitud/período/fase/frecuencia**, **dominio del tiempo vs. frecuencia**, **Fourier y por qué un pulso digital tiene infinitas frecuencias**, ancho de banda, componente DC, **atenuación/distorsión de retardo/ISI**, **tipos de ruido**, **dB/dBm/SNR (interpretación de −3 dB)**, **Nyquist y Shannon con ejercicios numéricos**, Eb/N0 |
| **U3** | Par trenzado/coaxial/**fibra (inmunidad EMI)**, monomodo/multimodo, microondas, Fresnel, FSPL, codificación de línea (NRZ/NRZI/AMI/Manchester/B8ZS/HDB3), **modulación ASK/FSK/PSK/QAM**, baudios vs. bps, **PCM con cálculo de tasa**, **multiplexación FDM/TDM/STDM/WDM**, ADSL/DMT, FDD/TDD |

> No incluye los temas que la cátedra dejó para después del parcial: detección/corrección de errores (cap. 6), control de enlace, ATM, ICMP/IGMP en detalle ni SONET/SDH en detalle.
