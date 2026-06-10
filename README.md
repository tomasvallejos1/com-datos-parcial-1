# 📡 Com Datos — Parcial 1 · Test interactivo

Web de autoevaluación para el **primer parcial de Comunicación de Datos** (UTN FRVT), cubriendo las **Unidades 1, 2 y 3** completas, basada en el resumen de la materia (Stallings, *Data and Computer Communications*, 10ª ed. + PowerPoints de la cátedra).

## ✨ Qué incluye

### 🎯 60 preguntas Multiple Choice
- **40 de nivel medio** y **20 de nivel difícil**
- **20 son de selección múltiple** (pueden tener 1, 2 o 3 correctas)
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

| Unidad | Temas |
|---|---|
| **U1** | Modelo de comunicación, tareas, LAN/WAN/MAN, conmutación de circuitos y paquetes, Internet, arquitectura de protocolos, encapsulamiento y PDU, TCP/IP, TCP/UDP, IP/TTL/IPv6, OSI, Ethernet y CSMA/CD, tráfico elástico/inelástico |
| **U2** | Enlaces y sentidos de transmisión, datos vs. señales, onda senoidal, Fourier, espectro y ancho de banda, componente DC, atenuación/distorsión de retardo/ISI, tipos de ruido, dB/dBm/SNR, Nyquist, Shannon, Eb/N0 |
| **U3** | Par trenzado/coaxial/fibra, categorías y parámetros de cobre, cableado estructurado y normas (TIA/ISO/IRAM), T568A/B, PoE, antenas, microondas, satélite GEO, Fresnel, FSPL, codificación de línea (NRZ/NRZI/AMI/Manchester/B8ZS/HDB3), modulación (ASK/FSK/PSK/QAM), PCM y delta, FDM/WDM/TDM/STDM, ADSL/DMT, FDD/TDD, FDMA/TDMA |
