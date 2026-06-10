/* =====================================================================
   60 preguntas multiple choice — Comunicación de Datos U1, U2, U3
   - diff: "media" (40) | "dificil" (20)
   - multi: true → selección múltiple (pueden ser 1, 2 o 3 correctas) (20)
   - correct: índices (base 0) de las opciones correctas
   - widget: id de simulador interactivo opcional (ver widgets.js)
   ===================================================================== */

const MC_QUESTIONS = [

/* ============================ UNIDAD 1 ============================ */
{
  id: 1, unit: 1, diff: "media", multi: false,
  q: "En el modelo general de comunicación de datos, ¿cuál es la función del TRANSMISOR?",
  options: [
    "Interpretar el mensaje final y mostrarlo al usuario.",
    "Convertir los datos en una señal adecuada para el medio de transmisión.",
    "Elegir la ruta que seguirán los paquetes IP.",
    "Almacenar la información hasta que el receptor esté disponible."
  ],
  correct: [1],
  explanation: "El transmisor transforma los datos en una señal apta para el medio: una placa de red convierte bits en señales eléctricas, un módem modula datos sobre una portadora, una antena Wi-Fi genera ondas electromagnéticas, un láser genera pulsos de luz en fibra. Interpretar el mensaje es tarea del destino, y elegir rutas es tarea de la capa de red (enrutamiento)."
},
{
  id: 2, unit: 1, diff: "media", multi: false,
  q: "¿Cuál es el orden correcto de los elementos del modelo general de comunicación?",
  options: [
    "Fuente → Receptor → Sistema de transmisión → Transmisor → Destino",
    "Transmisor → Fuente → Sistema de transmisión → Destino → Receptor",
    "Fuente → Transmisor → Sistema de transmisión → Receptor → Destino",
    "Fuente → Sistema de transmisión → Transmisor → Receptor → Destino"
  ],
  correct: [2],
  explanation: "El modelo es: Fuente (genera la información) → Transmisor (convierte datos en señal) → Sistema de transmisión (medio por el que viaja la señal) → Receptor (reconstruye los datos desde la señal recibida) → Destino (interpreta la información). Las señales asociadas son: m → g(t) → s(t) → r(t) → g'(t) → m'."
},
{
  id: 3, unit: 1, diff: "media", multi: true,
  q: "¿Cuáles de las siguientes son TAREAS propias de una comunicación de datos según Stallings? (seleccioná todas las correctas)",
  options: [
    "Control de flujo: evitar que el emisor sature al receptor.",
    "Direccionamiento: identificar origen, destino, redes y aplicaciones.",
    "Compilación del código fuente de las aplicaciones.",
    "Detección y corrección de errores producidos por ruido o interferencias."
  ],
  correct: [0, 1, 3],
  explanation: "Las tareas de la comunicación incluyen: uso del sistema de transmisión, interfaz, generación de señal, sincronización, gestión de intercambio, detección/corrección de errores, control de flujo, direccionamiento, enrutamiento, recuperación, formato de mensajes, seguridad y gestión de red. Compilar programas no es una tarea de comunicación: es del entorno de desarrollo."
},
{
  id: 4, unit: 1, diff: "media", multi: false,
  q: "¿Cuál de las siguientes afirmaciones describe mejor a una LAN?",
  options: [
    "Red que conecta sedes en distintas provincias usando enlaces de operador.",
    "Red de área reducida (oficina, edificio, campus), normalmente propiedad de una organización, con altas velocidades y baja latencia.",
    "Red que cubre una ciudad completa, típica de un proveedor municipal de fibra.",
    "Red satelital de cobertura continental."
  ],
  correct: [1],
  explanation: "Una LAN (Local Area Network) cubre un área reducida, suele ser propiedad de una organización, ofrece altas velocidades y baja latencia, y usa tecnologías como Ethernet y Wi-Fi. La opción de sedes en provincias describe una WAN, y la de ciudad describe una MAN."
},
{
  id: 5, unit: 1, diff: "media", multi: false,
  q: "¿Cuál es la principal VENTAJA de la conmutación de circuitos frente a la de paquetes?",
  options: [
    "Usa el medio de forma más eficiente con tráfico variable.",
    "No necesita establecer la comunicación antes de transmitir.",
    "Ofrece retardo predecible y ancho de banda reservado durante toda la comunicación.",
    "Es la base del funcionamiento de Internet."
  ],
  correct: [2],
  explanation: "En conmutación de circuitos se establece una ruta dedicada ANTES de transmitir y queda reservada toda la comunicación (ej.: telefonía tradicional). Por eso el retardo es predecible y el ancho de banda está garantizado. Su desventaja: desperdicia recursos cuando no se transmite. La eficiencia con tráfico variable y ser la base de Internet son propiedades de la conmutación de paquetes."
},
{
  id: 6, unit: 1, diff: "media", multi: true,
  q: "Sobre la conmutación de PAQUETES, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Usa eficientemente el medio porque los enlaces se comparten dinámicamente.",
    "Garantiza que los paquetes siempre lleguen en orden.",
    "Es la base de Internet.",
    "Los paquetes contienen información de control, como direcciones."
  ],
  correct: [0, 2, 3],
  explanation: "En conmutación de paquetes los datos se dividen en paquetes que viajan por enlaces compartidos; cada paquete lleva información de control (direcciones). Es eficiente con tráfico variable, escalable y es la base de Internet. Pero el retardo es variable, puede haber pérdida y los paquetes PUEDEN llegar fuera de orden — el reordenamiento lo resuelven capas superiores como TCP."
},
{
  id: 7, unit: 1, diff: "media", multi: false,
  q: "Todo protocolo define tres elementos clave. ¿Cuáles son?",
  options: [
    "Hardware, software y firmware.",
    "Sintaxis (formato), semántica (significado) y temporización (cuándo/a qué velocidad).",
    "Cliente, servidor y canal.",
    "Codificación, modulación y multiplexación."
  ],
  correct: [1],
  explanation: "Un protocolo define: SINTAXIS (formato de los datos: cabeceras, campos, orden de bits), SEMÁNTICA (significado de cada campo y acción: ej. el flag SYN de TCP significa inicio de conexión) y TEMPORIZACIÓN (cuándo transmitir, velocidades, timeouts: ej. temporizadores de retransmisión de TCP)."
},
{
  id: 8, unit: 1, diff: "dificil", multi: false,
  q: "Indicá la afirmación CORRECTA sobre servicio, protocolo e interfaz:",
  options: [
    "El protocolo define cómo una capa usa a la capa inferior dentro del mismo sistema.",
    "El servicio es el conjunto de reglas entre entidades pares de una misma capa.",
    "La interfaz define cómo una capa accede a los servicios de la capa inferior; el protocolo rige la comunicación entre entidades pares.",
    "Servicio, protocolo e interfaz son sinónimos en TCP/IP."
  ],
  correct: [2],
  explanation: "SERVICIO: lo que una capa ofrece a la superior (ej. transporte ofrece 'entrega confiable de bytes'). PROTOCOLO: reglas entre entidades PARES de la misma capa en sistemas distintos (ej. TCP entre dos hosts). INTERFAZ: cómo una capa usa a la inferior dentro del MISMO sistema (ej. una aplicación usa sockets). Las dos primeras opciones intercambian las definiciones."
},
{
  id: 9, unit: 1, diff: "media", multi: false,
  q: "Al enviar datos de una aplicación web, ¿cuál es el orden correcto de encapsulamiento?",
  options: [
    "Datos → Trama → Paquete IP → Segmento TCP → Bits",
    "Datos → Segmento TCP → Paquete IP → Trama → Bits/señal",
    "Datos → Paquete IP → Segmento TCP → Trama → Bits",
    "Bits → Trama → Paquete → Segmento → Datos"
  ],
  correct: [1],
  explanation: "Cada capa agrega su encabezado a lo que recibe de la capa superior: los datos de aplicación reciben encabezado TCP (→ segmento), luego encabezado IP (→ paquete/datagrama), luego encabezado y trailer Ethernet/Wi-Fi (→ trama), y finalmente se convierten en señales físicas (bits). En recepción ocurre el desencapsulamiento, en orden inverso.",
  widget: "encap"
},
{
  id: 10, unit: 1, diff: "media", multi: false,
  q: "¿Cuál es la función central de la capa de INTERNET en TCP/IP y cómo es su servicio de entrega?",
  options: [
    "Comunicación confiable entre procesos; entrega garantizada y ordenada.",
    "Permitir la comunicación entre redes diferentes mediante IP; entrega 'best effort' (no garantiza entrega, orden ni ausencia de duplicados).",
    "Formar tramas y controlar el acceso al medio; entrega entre nodos vecinos.",
    "Convertir bits en señales; entrega física punto a punto."
  ],
  correct: [1],
  explanation: "La capa de Internet (protocolo IP) interconecta redes heterogéneas: direccionamiento lógico, encaminamiento de paquetes y fragmentación en IPv4. IP es 'best effort': intenta entregar pero NO garantiza entrega, orden ni ausencia de duplicados — la confiabilidad la aporta TCP en la capa de transporte. Las otras opciones describen transporte, acceso a red y física."
},
{
  id: 11, unit: 1, diff: "media", multi: true,
  q: "¿Cuáles de estas características corresponden a TCP? (seleccioná todas las correctas)",
  options: [
    "Orientado a conexión, con three-way handshake.",
    "Entrega ordenada mediante números de secuencia.",
    "Sobrecarga mínima, sin confirmaciones ni retransmisiones.",
    "Control de flujo y control de congestión."
  ],
  correct: [0, 1, 3],
  explanation: "TCP es orientado a conexión (SYN, SYN+ACK, ACK), confiable (ACKs y retransmisiones), ordenado (números de secuencia), con control de flujo (ventana de recepción) y de congestión (adapta la velocidad al estado de la red). La 'sobrecarga mínima sin confirmaciones' describe a UDP."
},
{
  id: 12, unit: 1, diff: "media", multi: true,
  q: "¿Cuáles de estas aplicaciones son usos TÍPICOS de UDP? (seleccioná todas las correctas)",
  options: [
    "Consultas DNS.",
    "VoIP y videollamadas en tiempo real.",
    "Transferencia de un archivo que debe llegar completo y sin errores, sin que la aplicación maneje pérdidas.",
    "Videojuegos online."
  ],
  correct: [0, 1, 3],
  explanation: "UDP es simple, sin conexión y de baja sobrecarga: ideal para DNS (consultas cortas), VoIP, streaming, videojuegos y protocolos en tiempo real donde la baja latencia importa más que la entrega perfecta (QUIC también corre sobre UDP). Para un archivo que debe llegar completo sin que la aplicación gestione pérdidas se usa TCP."
},
{
  id: 13, unit: 1, diff: "dificil", multi: false,
  q: "¿Cuál es la secuencia correcta del three-way handshake de TCP?",
  options: [
    "Cliente envía ACK → Servidor responde SYN → Cliente envía SYN+ACK",
    "Cliente envía SYN → Servidor responde SYN+ACK → Cliente envía ACK",
    "Cliente envía SYN → Servidor responde ACK → Cliente envía FIN",
    "Servidor envía SYN → Cliente responde SYN → Servidor envía ACK"
  ],
  correct: [1],
  explanation: "El establecimiento de conexión TCP es: 1) Cliente → Servidor: SYN; 2) Servidor → Cliente: SYN+ACK; 3) Cliente → Servidor: ACK. A partir de ahí ambas partes tienen sincronizados los números de secuencia, que permiten ordenar bytes, detectar pérdidas y evitar duplicados. FIN se usa para CERRAR la conexión, no para abrirla."
},
{
  id: 14, unit: 1, diff: "dificil", multi: false,
  q: "Sobre el campo TTL de la cabecera IPv4, ¿qué afirmación es correcta?",
  options: [
    "Indica el tiempo en segundos que el paquete puede permanecer en el receptor.",
    "Cada router que reenvía el paquete lo decrementa; si llega a cero, el paquete se descarta.",
    "Es el checksum que detecta errores en los datos transportados.",
    "Indica cuántos fragmentos componen el paquete."
  ],
  correct: [1],
  explanation: "TTL (Time To Live) evita que un paquete quede circulando indefinidamente por la red (por ejemplo, en un bucle de enrutamiento): cada router lo decrementa en 1 y, al llegar a 0, el paquete se descarta. El checksum de IPv4 cubre solo la CABECERA, y la fragmentación se maneja con los campos identificación, flags (DF/MF) y offset."
},
{
  id: 15, unit: 1, diff: "dificil", multi: true,
  q: "¿Cuáles afirmaciones sobre IPv6 son correctas frente a IPv4? (seleccioná todas las correctas)",
  options: [
    "Usa direcciones de 128 bits.",
    "Elimina el checksum de cabecera.",
    "Mejora la autoconfiguración y el manejo de extensiones.",
    "Reduce el espacio de direcciones para simplificar el enrutamiento."
  ],
  correct: [0, 1, 2],
  explanation: "IPv6 AMPLÍA el espacio de direcciones con 128 bits (IPv4 usa 32), elimina el checksum de cabecera (lo verifica la capa de enlace y transporte), y mejora autoconfiguración, jerarquía de direccionamiento y cabeceras de extensión. La última opción es lo contrario de su objetivo principal."
},
{
  id: 16, unit: 1, diff: "media", multi: false,
  q: "En el modelo OSI, ¿qué capa se encarga de la traducción de formatos, el cifrado y la compresión de datos?",
  options: [
    "Capa 5 — Sesión",
    "Capa 6 — Presentación",
    "Capa 7 — Aplicación",
    "Capa 4 — Transporte"
  ],
  correct: [1],
  explanation: "La capa 6 (Presentación) se ocupa de la representación de los datos: traducción de formatos (ASCII, UTF-8, JPEG), cifrado (TLS conceptualmente) y compresión. La capa 5 (Sesión) gestiona diálogos y sesiones; la 7 (Aplicación) da servicios de red a las aplicaciones (HTTP, DNS, SMTP); la 4 (Transporte) da comunicación extremo a extremo (TCP/UDP)."
},
{
  id: 17, unit: 1, diff: "dificil", multi: true,
  q: "Sobre CSMA/CD y Ethernet, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Carrier Sense significa escuchar si el medio está libre antes de transmitir.",
    "Tras una colisión se aplica backoff exponencial: esperas aleatorias cada vez mayores.",
    "Collision Detection es un mecanismo de corrección de errores de bits mediante CRC.",
    "En Ethernet conmutada moderna full-duplex las colisiones prácticamente desaparecen."
  ],
  correct: [0, 1, 3],
  explanation: "CSMA/CD: Carrier Sense (escuchar el medio), Multiple Access (varios nodos comparten el medio), Collision Detection (DETECTAR colisiones, no corregir bits — la detección de errores de trama la hace el FCS con CRC). Tras una colisión se usa backoff exponencial. En Ethernet conmutada full-duplex cada enlace switch-host es dedicado, por lo que las colisiones prácticamente desaparecen."
},
{
  id: 18, unit: 1, diff: "media", multi: true,
  q: "¿Cuáles de los siguientes son ejemplos de tráfico INELÁSTICO? (seleccioná todas las correctas)",
  options: [
    "Voz en tiempo real (VoIP).",
    "Correo electrónico.",
    "Videollamadas.",
    "Videojuegos online."
  ],
  correct: [0, 2, 3],
  explanation: "El tráfico inelástico NO tolera bien retardo, jitter ni pérdida: voz en tiempo real, videollamadas, streaming en vivo y videojuegos online; requiere mínimos de latencia y variación de retardo. El correo, la navegación web y las descargas son tráfico ELÁSTICO: si hay congestión pueden esperar o bajar velocidad sin romper el servicio."
},

/* ============================ UNIDAD 2 ============================ */
{
  id: 19, unit: 2, diff: "media", multi: true,
  q: "Sobre los sentidos de transmisión, ¿cuáles asociaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Televisión abierta tradicional → simplex.",
    "Walkie-talkie → half-duplex.",
    "Llamada telefónica → full-duplex.",
    "Ethernet conmutada moderna → half-duplex obligatorio."
  ],
  correct: [0, 1, 2],
  explanation: "SIMPLEX: una sola dirección (TV abierta). HALF-DUPLEX: ambas direcciones pero no simultáneas (walkie-talkie). FULL-DUPLEX: ambas direcciones al mismo tiempo (telefonía, Ethernet full-duplex). La Ethernet conmutada moderna trabaja justamente en FULL-duplex con enlaces dedicados."
},
{
  id: 20, unit: 2, diff: "media", multi: false,
  q: "Un módem y el Wi-Fi (con ASK/FSK/PSK/QAM) son ejemplos de la combinación:",
  options: [
    "Datos digitales → señal digital",
    "Datos digitales → señal analógica",
    "Datos analógicos → señal digital",
    "Datos analógicos → señal analógica"
  ],
  correct: [1],
  explanation: "Las cuatro combinaciones son: digital→digital (codificación de línea: NRZ, AMI, Manchester — Ethernet en banda base), digital→analógica (MODULACIÓN digital: ASK, FSK, PSK, QAM — módem, Wi-Fi), analógico→digital (digitalización: PCM, delta — voz digitalizada), analógico→analógica (modulación analógica: AM, FM — radio). El módem modula datos digitales sobre una portadora analógica."
},
{
  id: 21, unit: 2, diff: "media", multi: false,
  q: "En la expresión s(t) = A · sen(2πft + φ), ¿qué representa cada parámetro?",
  options: [
    "A = atenuación, f = fase, φ = frecuencia",
    "A = amplitud pico, f = frecuencia en Hz, φ = fase",
    "A = ancho de banda, f = período, φ = longitud de onda",
    "A = amplitud media, f = factor de ruido, φ = potencia"
  ],
  correct: [1],
  explanation: "A es la amplitud pico (intensidad, en volts para señales eléctricas), f la frecuencia (ciclos por segundo, en Hz) y φ la fase (desplazamiento relativo de la onda, clave en PSK y QAM). Derivados: período T = 1/f y longitud de onda λ = v/f. Probá modificar cada parámetro en el simulador para ver su efecto.",
  widget: "sine"
},
{
  id: 22, unit: 2, diff: "media", multi: false,
  q: "Si una señal tiene frecuencia f = 1 kHz, su período T es:",
  options: [
    "1 segundo",
    "1 milisegundo",
    "1 microsegundo",
    "0,1 segundos"
  ],
  correct: [1],
  explanation: "T = 1/f. Con f = 1 kHz = 1000 Hz: T = 1/1000 s = 1 ms. El período es el tiempo que dura un ciclo completo; a mayor frecuencia, ciclos más cortos. Verificalo en el simulador moviendo la frecuencia.",
  widget: "sine"
},
{
  id: 23, unit: 2, diff: "dificil", multi: false,
  q: "¿Cuál es la longitud de onda aproximada de una señal Wi-Fi de 2,4 GHz en el aire? (v ≈ 3×10⁸ m/s)",
  options: [
    "12,5 metros",
    "1,25 metros",
    "12,5 centímetros",
    "1,25 milímetros"
  ],
  correct: [2],
  explanation: "λ = v/f = (3×10⁸ m/s) / (2,4×10⁹ Hz) = 0,125 m = 12,5 cm. Por comparación: Wi-Fi 5 GHz → λ ≈ 6 cm; radio AM 1 MHz → λ ≈ 300 m. La longitud de onda influye en el tamaño de las antenas y en cómo interactúa la señal con los obstáculos."
},
{
  id: 24, unit: 2, diff: "media", multi: false,
  q: "¿Qué instrumento/representación corresponde al DOMINIO DE LA FRECUENCIA?",
  options: [
    "Osciloscopio: amplitud vs. tiempo.",
    "Analizador de espectro: energía vs. frecuencia.",
    "Multímetro: tensión instantánea.",
    "Cronómetro: período de la señal."
  ],
  correct: [1],
  explanation: "El dominio del TIEMPO muestra cómo cambia la señal con el tiempo (osciloscopio: amplitud vs. tiempo). El dominio de la FRECUENCIA muestra qué frecuencias componen la señal y con qué intensidad (analizador de espectro: energía vs. frecuencia). Idea clave: una señal compleja en el tiempo puede ser suma de senoidales simples en frecuencia (Fourier).",
  widget: "fourier"
},
{
  id: 25, unit: 2, diff: "media", multi: false,
  q: "Según Fourier, si un canal atenúa las frecuencias altas, ¿qué le ocurre a una señal cuadrada digital que lo atraviesa?",
  options: [
    "Nada, porque la señal cuadrada solo tiene una frecuencia.",
    "Se redondean sus transiciones porque pierde los armónicos superiores.",
    "Aumenta su amplitud por resonancia.",
    "Se convierte en una señal de frecuencia más alta."
  ],
  correct: [1],
  explanation: "Una señal cuadrada se construye sumando la frecuencia fundamental más armónicos (frecuencias múltiplo). Las transiciones abruptas ('esquinas') dependen de los armónicos de ALTA frecuencia: si el canal los filtra, la señal se redondea y los pulsos se deforman. Por eso mayor velocidad de datos exige mayor ancho de banda. Jugá con la cantidad de armónicos en el simulador.",
  widget: "fourier"
},
{
  id: 26, unit: 2, diff: "media", multi: false,
  q: "¿Qué es la componente DC de una señal y por qué es un problema?",
  options: [
    "Es la frecuencia máxima de la señal; satura los amplificadores.",
    "Es la componente de frecuencia cero (valor promedio); muchos medios y equipos (transformadores, acoples capacitivos) no la transmiten bien.",
    "Es el ruido térmico de base; se elimina con filtros pasa-altos.",
    "Es la diferencia entre amplitud máxima y mínima; limita el rango dinámico."
  ],
  correct: [1],
  explanation: "La componente DC (continua) es la parte de frecuencia CERO de la señal: su valor promedio. Es problemática porque transformadores y acoples capacitivos no transmiten continua, y porque suele indicar largas secuencias sin transiciones (mala sincronización). Ej.: NRZ con muchos unos seguidos mantiene un nivel constante → promedio distinto de cero. Códigos como AMI o Manchester la eliminan.",
  widget: "linecode"
},
{
  id: 27, unit: 2, diff: "media", multi: true,
  q: "¿Cuáles son VENTAJAS de la transmisión digital frente a la analógica? (seleccioná todas las correctas)",
  options: [
    "Los repetidores regeneran los bits y eliminan el ruido acumulado.",
    "Permite detección y corrección de errores.",
    "El amplificador amplifica la señal y también el ruido.",
    "Facilita la multiplexación y la integración de voz, datos y video."
  ],
  correct: [0, 1, 3],
  explanation: "Ventajas digitales: regeneración (un repetidor reconstruye los bits y genera señal limpia, sin acumular ruido), detección/corrección de errores, multiplexación más fácil, cifrado y compresión simples, e integración de servicios. Que el amplificador amplifique TAMBIÉN el ruido es justamente el problema de la transmisión ANALÓGICA, no una ventaja digital."
},
{
  id: 28, unit: 2, diff: "media", multi: false,
  q: "¿Cuál es la diferencia clave entre un amplificador y un repetidor/regenerador?",
  options: [
    "No hay diferencia, son sinónimos.",
    "El amplificador aumenta la potencia de la señal (incluido el ruido); el regenerador reconstruye los bits y genera una señal nueva y limpia.",
    "El repetidor solo funciona en fibra óptica.",
    "El amplificador corrige errores de bit; el repetidor no."
  ],
  correct: [1],
  explanation: "El amplificador (transmisión analógica) eleva la potencia de TODO lo que recibe, ruido incluido: el ruido se acumula etapa tras etapa. El repetidor/regenerador (transmisión digital) decide qué bits llegaron y genera una señal nueva y limpia, eliminando el ruido acumulado. Esta es una de las grandes ventajas de la transmisión digital."
},
{
  id: 29, unit: 2, diff: "dificil", multi: false,
  q: "La interferencia intersimbólica (ISI) es consecuencia directa de:",
  options: [
    "El ruido térmico del receptor.",
    "La distorsión de retardo: componentes de distinta frecuencia llegan en tiempos distintos y un símbolo se 'derrama' sobre el siguiente.",
    "La componente DC de la señal.",
    "El uso de modulaciones QAM de muchos niveles."
  ],
  correct: [1],
  explanation: "La distorsión de retardo ocurre cuando distintas componentes de frecuencia viajan a velocidades diferentes (típico de medios guiados). El resultado es que un pulso se ensancha e interfiere con los símbolos vecinos: ISI. El receptor ya no distingue claramente dónde termina un bit y empieza el otro, lo que limita la velocidad de señalización. La multitrayectoria inalámbrica también produce ISI."
},
{
  id: 30, unit: 2, diff: "media", multi: true,
  q: "Sobre los tipos de RUIDO, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "El ruido térmico se debe a la agitación de electrones y está presente en todos los sistemas.",
    "El ruido de intermodulación aparece por no linealidades: señales f1 y f2 generan componentes f1+f2 y f1−f2.",
    "El ruido impulsivo es continuo y de baja amplitud, casi inofensivo para datos digitales.",
    "La diafonía (crosstalk) es la inducción de la señal de un par sobre otro, como en cables UTP."
  ],
  correct: [0, 1, 3],
  explanation: "Ruido térmico: agitación térmica de electrones, presente siempre, modelado como ruido blanco. Intermodulación: medios no lineales mezclan frecuencias (f1±f2). Diafonía: acoplamiento entre pares cercanos (NEXT cerca del transmisor, FEXT en el extremo lejano). El ruido IMPULSIVO es lo contrario de lo que dice la opción: picos de ALTA amplitud y CORTA duración (motores, relés, descargas) — especialmente dañino para datos digitales porque un pico breve corrompe varios bits."
},
{
  id: 31, unit: 2, diff: "media", multi: false,
  q: "Si la potencia de una señal se DUPLICA, la ganancia en dB es aproximadamente:",
  options: [
    "+2 dB",
    "+3 dB",
    "+10 dB",
    "+6 dB"
  ],
  correct: [1],
  explanation: "dB = 10·log₁₀(P1/P2). Si P1/P2 = 2 → 10·log₁₀(2) ≈ 3 dB. Reglas útiles: +3 dB duplica, −3 dB mitad, +10 dB ×10, +20 dB ×100, +30 dB ×1000. La gracia de los dB: las multiplicaciones de ganancias/pérdidas en cascada se convierten en sumas.",
  widget: "db"
},
{
  id: 32, unit: 2, diff: "media", multi: false,
  q: "¿A cuántos dBm equivale una potencia de 1 W?",
  options: [
    "0 dBm",
    "10 dBm",
    "30 dBm",
    "60 dBm"
  ],
  correct: [2],
  explanation: "dBm = 10·log₁₀(P/1mW). 1 W = 1000 mW → 10·log₁₀(1000) = 30 dBm. Referencias: 1 mW = 0 dBm; 10 mW = 10 dBm; 100 mW = 20 dBm. Relación con dBW: dBm = dBW + 30. En Wi-Fi se reciben valores NEGATIVOS de dBm porque la potencia recibida es menor a 1 mW.",
  widget: "db"
},
{
  id: 33, unit: 2, diff: "dificil", multi: false,
  q: "Un enlace recibe señal de −60 dBm con un piso de ruido de −90 dBm. ¿Cuál es el SNR y qué significa en escala lineal?",
  options: [
    "SNR = −150 dB; la señal es más débil que el ruido.",
    "SNR = 30 dB; la señal es 1000 veces más potente que el ruido.",
    "SNR = 30 dB; la señal es 30 veces más potente que el ruido.",
    "SNR = 150 dB; la señal es 10¹⁵ veces más potente."
  ],
  correct: [1],
  explanation: "Con ambas potencias en dBm: SNRdB = Señal − Ruido = −60 − (−90) = 30 dB. En lineal: 10^(30/10) = 1000 → la señal es 1000 veces más potente que el ruido. Guía: 10 dB = ×10, 20 dB = ×100, 30 dB = ×1000. Mayor SNR permite modulaciones más densas (64-QAM, 256-QAM).",
  widget: "db"
},
{
  id: 34, unit: 2, diff: "media", multi: false,
  q: "Según Nyquist, ¿cuál es la capacidad de un canal IDEAL (sin ruido) de 3 kHz usando 2 niveles de señal?",
  options: [
    "3000 bps",
    "6000 bps",
    "12000 bps",
    "1500 bps"
  ],
  correct: [1],
  explanation: "Nyquist: C = 2B·log₂(M). Con B = 3000 Hz y M = 2 niveles: C = 2·3000·log₂(2) = 6000·1 = 6000 bps. Con señalización binaria, la capacidad es el doble del ancho de banda. Probá en el simulador cómo crece C al agregar niveles.",
  widget: "ns"
},
{
  id: 35, unit: 2, diff: "dificil", multi: false,
  q: "El mismo canal de 3 kHz sin ruido, pero ahora con 16 niveles de señal, tiene capacidad:",
  options: [
    "12.000 bps",
    "48.000 bps",
    "24.000 bps",
    "96.000 bps"
  ],
  correct: [2],
  explanation: "C = 2B·log₂(M) = 2·3000·log₂(16) = 6000·4 = 24.000 bps. Cada símbolo de 16 niveles transporta log₂(16) = 4 bits. Limitación: en un canal real no se puede aumentar M indefinidamente, porque los niveles quedan tan juntos que el ruido los confunde — ahí entra Shannon.",
  widget: "ns"
},
{
  id: 36, unit: 2, diff: "dificil", multi: false,
  q: "Una línea telefónica tiene B = 3100 Hz y SNR = 30 dB. Según Shannon, su capacidad máxima teórica es aproximadamente:",
  options: [
    "9.600 bps",
    "31.000 bps",
    "96.000 bps",
    "3.100 bps"
  ],
  correct: [1],
  explanation: "Primero convertir SNR a lineal: 10^(30/10) = 1000. Shannon: C = B·log₂(1+SNR) = 3100·log₂(1001) ≈ 3100·9,97 ≈ 30.900 bps ≈ 31 kbps. Es un TECHO teórico: ningún sistema real lo supera con errores arbitrariamente pequeños. Con Nyquist se ve que harían falta ~32 niveles para acercarse a ese límite.",
  widget: "ns"
},
{
  id: 37, unit: 2, diff: "dificil", multi: true,
  q: "Sobre Nyquist y Shannon, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Nyquist analiza un canal ideal SIN ruido: C = 2B·log₂(M).",
    "Shannon incorpora el ruido: C = B·log₂(1+SNR) y fija el techo teórico.",
    "Aumentar el SNR aumenta la capacidad de forma logarítmica; aumentar B lo hace casi linealmente.",
    "Nyquist indica el valor máximo de M que el ruido permite usar."
  ],
  correct: [0, 1, 2],
  explanation: "Nyquist (canal ideal): C = 2B·log₂(M) — responde cuántos bits puedo enviar con M niveles. Shannon (canal real): C = B·log₂(1+SNR) — el techo absoluto con ese ruido. B aporta capacidad casi lineal; SNR, logarítmica. Nyquist NO considera ruido, por lo tanto no puede decir qué M es viable: es Shannon quien impone el límite, y Nyquist ayuda a estimar cuántos niveles harían falta para acercarse.",
  widget: "ns"
},
{
  id: 38, unit: 2, diff: "dificil", multi: false,
  q: "¿Por qué las modulaciones con más bits por símbolo (ej. 256-QAM) requieren mayor Eb/N0 para mantener la misma BER?",
  options: [
    "Porque transmiten a menor velocidad y el ruido se acumula más tiempo.",
    "Porque los puntos de la constelación quedan más cerca entre sí y el ruido los confunde más fácilmente.",
    "Porque usan frecuencias más altas, que se atenúan más.",
    "Porque el receptor debe demodular en half-duplex."
  ],
  correct: [1],
  explanation: "Eb/N0 relaciona la energía por bit con la densidad espectral de ruido. Al meter más bits por símbolo, los puntos de la constelación I/Q se aprietan: la distancia entre símbolos vecinos disminuye y un mismo nivel de ruido produce más decisiones erróneas. Por eso 256-QAM exige mucho mejor SNR/Eb-N0 que QPSK para la misma tasa de error (BER).",
  widget: "qam"
},

/* ============================ UNIDAD 3 ============================ */
{
  id: 39, unit: 3, diff: "media", multi: false,
  q: "¿Por qué se TRENZAN los pares de cobre en un cable de par trenzado?",
  options: [
    "Para que el cable sea más flexible y fácil de instalar.",
    "Porque la torsión reduce la interferencia electromagnética y la diafonía: las interferencias afectan a ambos conductores por igual y se cancelan en recepción diferencial.",
    "Para aumentar la velocidad de propagación de la señal.",
    "Para reducir el costo del cobre utilizado."
  ],
  correct: [1],
  explanation: "Al trenzar los dos conductores, una interferencia externa induce señales casi idénticas en ambos; como el receptor mide la DIFERENCIA entre los conductores (recepción diferencial), ese ruido común se cancela en gran parte. También reduce la diafonía entre pares vecinos. Es la razón por la que el UTP, sin blindaje, funciona tan bien en LANs."
},
{
  id: 40, unit: 3, diff: "dificil", multi: false,
  q: "¿Qué categoría de par trenzado se especifica a 500 MHz y soporta 10GBASE-T hasta 100 metros?",
  options: [
    "Cat 5e",
    "Cat 6",
    "Cat 6A",
    "Cat 8"
  ],
  correct: [2],
  explanation: "Cat 6A: 500 MHz, 10 GbE hasta 100 m. Comparación: Cat 5e (100 MHz, 1 GbE a 100 m), Cat 6 (250 MHz, 10 GbE solo en distancias menores), Cat 7 (600 MHz, blindados), Cat 8 (~2000 MHz, 25/40G en distancias cortas de datacenter). Recordá: la categoría del ENLACE queda limitada por el componente más débil (cable, conectores, patch panel, instalación)."
},
{
  id: 41, unit: 3, diff: "media", multi: true,
  q: "¿Cuáles son VENTAJAS de la fibra óptica? (seleccioná todas las correctas)",
  options: [
    "Inmunidad a la interferencia electromagnética (EMI).",
    "Baja atenuación, que permite largas distancias.",
    "Conectores y empalmes más simples y baratos que el cobre.",
    "Enorme ancho de banda."
  ],
  correct: [0, 1, 3],
  explanation: "La fibra transmite LUZ guiada por reflexión interna total: es inmune a EMI, tiene altísimo ancho de banda, baja atenuación (largas distancias), baja tasa de error y es difícil de interceptar. Sus DESVENTAJAS: empalmes y conectores más delicados y costosos, equipos ópticos caros, requiere limpieza e instalación especializada."
},
{
  id: 42, unit: 3, diff: "dificil", multi: false,
  q: "¿Qué fenómeno limita la distancia y velocidad de la fibra MULTIMODO frente a la monomodo?",
  options: [
    "La opacidad del núcleo de mayor diámetro.",
    "La dispersión modal: los distintos rayos de luz recorren caminos diferentes y llegan en tiempos distintos.",
    "La imposibilidad de usar conectores en multimodo.",
    "La mayor atenuación del cladding."
  ],
  correct: [1],
  explanation: "En la multimodo el núcleo permite MÚLTIPLES trayectorias de luz; los rayos llegan en tiempos distintos (dispersión modal) y el pulso se ensancha, limitando distancia y velocidad. La monomodo, con núcleo muy pequeño, permite esencialmente un solo modo: mayor distancia y ancho de banda, pero exige láseres y alineación más precisa. Ventanas ópticas típicas: 850, 1310 y 1550 nm (esta última, de menor atenuación, domina en larga distancia y WDM)."
},
{
  id: 43, unit: 3, diff: "media", multi: true,
  q: "Sobre los parámetros de calidad de un enlace de cobre, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "NEXT es la diafonía medida en el extremo CERCANO al transmisor.",
    "FEXT es la diafonía medida en el extremo LEJANO.",
    "Return Loss mide la energía reflejada por desadaptaciones de impedancia.",
    "Alien Crosstalk es la diafonía entre pares del MISMO cable."
  ],
  correct: [0, 1, 2],
  explanation: "NEXT (Near-End Crosstalk): interferencia medida cerca del transmisor — crítica porque una transmisión fuerte puede pisar una recepción débil. FEXT (Far-End): en el extremo lejano. Return Loss: reflexiones por desadaptación de impedancia. Insertion Loss: atenuación del canal. El ALIEN crosstalk es entre CABLES DISTINTOS (no entre pares del mismo cable) y es importante en 10GBASE-T."
},
{
  id: 44, unit: 3, diff: "media", multi: true,
  q: "¿Cuáles asociaciones entre norma y tema son correctas? (seleccioná todas las correctas)",
  options: [
    "ANSI/TIA-568 → cableado de telecomunicaciones en edificios comerciales.",
    "ANSI/TIA-606 → administración y documentación (etiquetado, registros).",
    "ANSI/TIA-607 → infraestructura de centros de datos.",
    "ANSI/TIA-942 → puesta a tierra y equipotencialidad."
  ],
  correct: [0, 1],
  explanation: "Correctas: TIA-568 (cableado en edificios comerciales) y TIA-606 (administración/documentación/etiquetado). Las otras dos están INTERCAMBIADAS: TIA-607 es puesta a tierra y equipotencialidad; TIA-942 es infraestructura de DATACENTERS. Otras: TIA-569 (espacios y recorridos), ISO/IEC 11801 (cableado genérico internacional; IRAM la adapta en Argentina), IEEE 802.3 (Ethernet)."
},
{
  id: 45, unit: 3, diff: "media", multi: false,
  q: "Un cable terminado con T568A en un extremo y T568B en el otro es un cable:",
  options: [
    "Directo, usado para conectar PC a switch.",
    "Cruzado, que históricamente cruzaba transmisión y recepción.",
    "De consola, para configurar routers.",
    "Defectuoso, no debe usarse nunca."
  ],
  correct: [1],
  explanation: "Misma norma en ambos extremos (A–A o B–B) = cable DIRECTO (dispositivos distintos, ej. PC a switch). Norma distinta (A–B) = cable CRUZADO: en Ethernet 10/100 cruzaba TX y RX para conectar equipos iguales. Hoy perdió importancia: Gigabit usa los 4 pares y los equipos modernos tienen auto MDI-X que detecta y cruza automáticamente."
},
{
  id: 46, unit: 3, diff: "media", multi: false,
  q: "¿Qué es PoE (Power over Ethernet)?",
  options: [
    "Un protocolo de enrutamiento para redes Ethernet.",
    "La capacidad de alimentar dispositivos (APs, cámaras IP, teléfonos VoIP) a través del mismo cable Ethernet que lleva los datos.",
    "Una técnica de modulación para aumentar la velocidad de Ethernet.",
    "Un estándar de fibra óptica con energía lumínica."
  ],
  correct: [1],
  explanation: "PoE permite que datos y energía compartan el cable de par trenzado, simplificando la instalación de access points, cámaras IP, teléfonos VoIP y sensores (no hace falta llevar alimentación eléctrica aparte). Puntos de cuidado: potencia requerida, categoría del cable, temperatura por agrupamiento de cables y compatibilidad del estándar PoE."
},
{
  id: 47, unit: 3, diff: "media", multi: false,
  q: "Sobre la GANANCIA de una antena, ¿qué afirmación es correcta?",
  options: [
    "Una antena con ganancia crea energía adicional gracias a su diseño.",
    "La ganancia mide cuánto CONCENTRA la energía en ciertas direcciones respecto de una referencia (dBi: vs. isotrópica; dBd: vs. dipolo).",
    "La ganancia solo existe en antenas transmisoras, no receptoras.",
    "La antena isotrópica es la de mayor ganancia posible."
  ],
  correct: [1],
  explanation: "Una antena NO crea energía: la concentra en ciertas direcciones. La ganancia se expresa en dBi (respecto de la antena isotrópica, modelo ideal que irradia igual en todas direcciones y no existe físicamente) o dBd (respecto del dipolo). Por reciprocidad, la misma antena transmite y recibe con propiedades equivalentes. Las direccionales (ej. parabólica, con la fuente en el foco del paraboloide) logran haz estrecho, más alcance y mejor SNR."
},
{
  id: 48, unit: 3, diff: "media", multi: true,
  q: "Sobre las microondas TERRESTRES, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Requieren línea de vista entre las antenas.",
    "Usan antenas direccionales en enlaces punto a punto.",
    "La atenuación por lluvia crece a frecuencias altas, especialmente sobre 10 GHz.",
    "Usan antenas omnidireccionales para cubrir toda la zona."
  ],
  correct: [0, 1, 2],
  explanation: "Las microondas terrestres (2–40 GHz) son enlaces DIRECCIONALES punto a punto que requieren línea de vista y alineación. Ventajas: despliegue rápido frente a tender fibra, buena capacidad a distancias moderadas. La lluvia atenúa cada vez más por encima de ~10 GHz. Las antenas omnidireccionales son típicas de radiodifusión, no de enlaces de microondas punto a punto."
},
{
  id: 49, unit: 3, diff: "dificil", multi: false,
  q: "¿A qué altura orbita un satélite GEOESTACIONARIO y cuál es su principal desventaja?",
  options: [
    "~2.000 km; cobertura muy reducida.",
    "~35.786 km; retardo alto por la distancia y pérdidas de espacio libre elevadas.",
    "~400 km; necesita reposicionamiento constante.",
    "~100.000 km; interferencia lunar."
  ],
  correct: [1],
  explanation: "El satélite GEO está a unos 35.786 km y parece fijo respecto de la Tierra (mismo período que la rotación terrestre). Ventajas: gran cobertura y antenas terrestres fijas. Desventajas: retardo alto (la señal recorre ~36.000 km de subida y otro tanto de bajada), grandes pérdidas de espacio libre y afectación por clima en ciertas bandas. Funciona como repetidor: recibe por el uplink, el transpondedor procesa y retransmite por el downlink."
},
{
  id: 50, unit: 3, diff: "dificil", multi: false,
  q: "Según la fórmula de pérdida en espacio libre FSPL(dB) = 32,44 + 20·log₁₀(d_km) + 20·log₁₀(f_MHz), duplicar la distancia del enlace:",
  options: [
    "Duplica la pérdida total en dB.",
    "Aumenta la pérdida en unos 3 dB.",
    "Aumenta la pérdida en unos 6 dB.",
    "No cambia la pérdida si la frecuencia es constante."
  ],
  correct: [2],
  explanation: "El término de distancia es 20·log₁₀(d): al duplicar d, suma 20·log₁₀(2) ≈ 6 dB. Lo mismo pasa al duplicar la frecuencia: +6 dB. Por eso los enlaces largos y de frecuencias altas necesitan antenas de mayor ganancia o más potencia. Probalo en el simulador.",
  widget: "fspl"
},
{
  id: 51, unit: 3, diff: "dificil", multi: true,
  q: "Sobre propagación inalámbrica, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Como regla práctica, se busca despejar al menos el 60% de la primera zona de Fresnel.",
    "La multitrayectoria puede causar desvanecimiento, interferencia destructiva e ISI.",
    "OFDM, la diversidad y MIMO ayudan a mitigar (o aprovechar) la multitrayectoria.",
    "La zona de Fresnel solo es relevante en enlaces de fibra óptica."
  ],
  correct: [0, 1, 2],
  explanation: "No alcanza con que las antenas 'se vean': la zona de Fresnel (región elipsoidal alrededor del camino directo) debe estar mayormente despejada (~60% de la primera zona) para evitar difracción y pérdidas. La multitrayectoria (reflexiones, difracción) genera desvanecimiento, variación rápida de señal e ISI; OFDM, diversidad y MIMO la mitigan o incluso la aprovechan. La fibra es un medio GUIADO: Fresnel no aplica.",
  widget: "fspl"
},
{
  id: 52, unit: 3, diff: "media", multi: false,
  q: "¿Qué característica distintiva tiene el código Manchester y qué costo paga por ella?",
  options: [
    "Usa tres niveles de voltaje; requiere más potencia.",
    "Garantiza una transición en el medio de cada bit (sincronización incorporada, sin DC); a cambio requiere hasta el doble de ancho de banda que NRZ.",
    "Elimina las transiciones para ahorrar ancho de banda; pierde sincronización.",
    "Solo puede transmitir secuencias sin ceros consecutivos."
  ],
  correct: [1],
  explanation: "Manchester (código bifase) tiene SIEMPRE una transición en mitad del bit, que sirve a la vez de dato y de reloj: sincronización garantizada y sin componente DC. El costo: hasta el doble de tasa de señalización — para 1 Mbps, NRZ usa 1 Mbaudio pero Manchester necesita 2 Mbaudios (elementos de 0,5 μs). En el simulador, comparalo con NRZ y mirá la cantidad de transiciones.",
  widget: "linecode"
},
{
  id: 53, unit: 3, diff: "media", multi: true,
  q: "Sobre el código AMI, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Los unos alternan polaridad (+/−), por lo que no tiene componente DC neta.",
    "Permite detectar errores mediante violaciones de la alternancia bipolar.",
    "Garantiza transiciones incluso con largas cadenas de ceros.",
    "Usa tres niveles: 0 = ausencia de señal; 1 = pulso positivo o negativo alternado."
  ],
  correct: [0, 1, 3],
  explanation: "AMI (Alternate Mark Inversion): 0 = sin señal, 1 = pulsos que alternan + y − (por eso el promedio tiende a cero → sin DC) y una violación de la alternancia delata un error. Su PROBLEMA: las largas cadenas de CEROS no generan pulsos ni transiciones y el receptor pierde sincronización — lo resuelven los códigos de scrambling B8ZS y HDB3. Escribí '110000000011' en el simulador y miralo.",
  widget: "linecode"
},
{
  id: 54, unit: 3, diff: "dificil", multi: false,
  q: "¿Cómo resuelven B8ZS y HDB3 el problema de las largas cadenas de ceros de AMI?",
  options: [
    "Eliminando los ceros del flujo de datos antes de transmitir.",
    "Sustituyendo las cadenas (8 ceros en B8ZS, 4 en HDB3) por patrones con violaciones bipolares INTENCIONALES que el receptor reconoce y deshace.",
    "Aumentando la potencia de transmisión durante los ceros.",
    "Cambiando a codificación Manchester temporalmente."
  ],
  correct: [1],
  explanation: "Son técnicas de scrambling: B8ZS reemplaza 8 ceros por un patrón con violaciones (ej. 000+−0−+ si el último pulso fue positivo); HDB3 evita más de 3 ceros usando patrones 000V o B00V según la polaridad y paridad de pulsos. El receptor reconoce la violación como SUSTITUCIÓN (no como error) y reconstruye los ceros originales. Así se mantiene la sincronización y el balance DC sin reducir la velocidad de datos. HDB3 se usa en los sistemas europeos E-carrier."
},
{
  id: 55, unit: 3, diff: "media", multi: false,
  q: "Un módem QPSK transmite a 9600 bps. ¿Cuál es su velocidad de señalización en baudios?",
  options: [
    "9600 baudios",
    "4800 baudios",
    "19200 baudios",
    "2400 baudios"
  ],
  correct: [1],
  explanation: "QPSK usa 4 fases separadas 90° → log₂(4) = 2 bits por símbolo. Baudios = bps / (bits por símbolo) = 9600/2 = 4800 baudios. Recordá la relación: bps = baudios × bits/símbolo. BPSK: 1 bit/símbolo; 16-QAM: 4; 64-QAM: 6. Mirá las constelaciones en el simulador.",
  widget: "qam"
},
{
  id: 56, unit: 3, diff: "dificil", multi: true,
  q: "Sobre QAM, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Combina cambios de amplitud y de fase; los símbolos son puntos de una constelación I/Q.",
    "En 64-QAM cada símbolo transporta 6 bits.",
    "256-QAM es más robusta frente al ruido que QPSK.",
    "A más puntos en la constelación, menor separación entre ellos y mayor SNR requerido."
  ],
  correct: [0, 1, 3],
  explanation: "QAM modula amplitud Y fase: cada símbolo es un punto en la constelación I/Q. 16-QAM = 4 bits, 64-QAM = 6 bits, 256-QAM = 8 bits, 1024-QAM = 10 bits por símbolo. El trade-off: más puntos → más bits por símbolo pero puntos más juntos → MÁS sensible al ruido (necesita mayor SNR). Por eso 256-QAM es MENOS robusta que QPSK, no más. Subí el ruido en el simulador y mirá cuándo empiezan los errores.",
  widget: "qam"
},
{
  id: 57, unit: 3, diff: "media", multi: false,
  q: "En telefonía digital con PCM: la voz se limita a 4 kHz, se muestrea según Nyquist y se usan 8 bits por muestra. ¿Qué tasa resulta?",
  options: [
    "32 kbps",
    "64 kbps (8000 muestras/s × 8 bits) — canal DS0",
    "128 kbps",
    "8 kbps"
  ],
  correct: [1],
  explanation: "Teorema de muestreo: fs ≥ 2·fmax = 2·4000 = 8000 muestras/s. Con 8 bits por muestra: 8000 × 8 = 64.000 bps = 64 kbps (canal DS0, la base de la telefonía digital: 24 DS0 forman un DS-1 de 1,544 Mbps). Etapas de PCM: muestreo → cuantización → codificación. El companding asigna más niveles a amplitudes pequeñas para mejorar la calidad percibida de la voz.",
  widget: "pcm"
},
{
  id: 58, unit: 3, diff: "media", multi: false,
  q: "¿Qué técnica de multiplexación transporta varios canales por una misma fibra usando distintas longitudes de onda ('colores' de luz)?",
  options: [
    "FDM",
    "TDM síncrono",
    "WDM (y su versión densa, DWDM)",
    "STDM"
  ],
  correct: [2],
  explanation: "WDM (Wavelength Division Multiplexing) es conceptualmente como FDM pero en fibra óptica: varios láseres con distintas longitudes de onda se combinan en un multiplexor óptico, viajan juntos por la fibra y se separan en destino. DWDM (Dense WDM) usa canales muy próximos para multiplicar la capacidad sin tender nuevas fibras: clave en backbones, enlaces submarinos y datacenters."
},
{
  id: 59, unit: 3, diff: "dificil", multi: true,
  q: "Sobre ADSL, DMT y duplexado, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "ADSL es asimétrico (más bajada que subida) y usa FDM sobre el par telefónico, reservando la banda baja para voz POTS.",
    "DMT divide el ancho de banda en muchos subcanales y asigna más bits a los de mejor SNR.",
    "TDD usa una sola banda de frecuencia alternando el tiempo entre subida y bajada.",
    "FDMA consiste en asignar ranuras de TIEMPO a cada estación."
  ],
  correct: [0, 1, 2],
  explanation: "ADSL usa el par telefónico existente con FDM: banda baja para voz POTS, bandas superiores para datos, con más capacidad de bajada que de subida (alcance típico hasta ~5,5 km). DMT (Discrete MultiTone) evalúa el SNR de cada subcanal: los buenos llevan más bits, los malos menos o se desactivan. TDD alterna subida/bajada en el tiempo sobre una banda única (FDD usa dos bandas separadas). FDMA asigna BANDAS DE FRECUENCIA; el que asigna ranuras de tiempo es TDMA."
},
{
  id: 60, unit: 3, diff: "media", multi: true,
  q: "Comparando TDM síncrono y STDM (estadístico), ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "En TDM síncrono cada fuente tiene una ranura fija que se transmite aunque no tenga datos (se desperdicia).",
    "STDM asigna ranuras dinámicamente solo a las fuentes con datos: más eficiente con tráfico por ráfagas.",
    "STDM necesita agregar una dirección/identificador en cada ranura para saber de qué fuente es.",
    "STDM elimina la necesidad de buffers y nunca agrega retardo."
  ],
  correct: [0, 1, 2],
  explanation: "TDM síncrono: tramas con ranuras FIJAS por fuente → simple y de retardo predecible, pero desperdicia ranuras inactivas. STDM: asigna ranuras según demanda → eficiente con ráfagas y permite que la línea agregada sea menor que la suma de picos; a cambio NECESITA buffers (que agregan retardo variable) y overhead de direccionamiento por ranura. Regla práctica: utilización mayor a ~80% dispara retardos y tamaño de buffers. Miralo en la animación.",
  widget: "mux"
}
];
