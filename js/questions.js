/* =====================================================================
   60 preguntas multiple choice — Comunicación de Datos U1, U2, U3
   Enfocadas en el temario confirmado por la cátedra:
   conmutación, TCP/IP y OSI, capacidad de canal (Nyquist/Shannon),
   señales y transmisión, modulación (ASK/FSK/PSK/QAM), multiplexación
   (TDM/FDM), dB/SNR, medios de transmisión y PCM. Incluye ejercicios
   numéricos de práctica (Shannon, Nyquist, PCM, dB).
   - diff: "media" (40) | "dificil" (20)
   - multi: true → selección múltiple con 1, 2 o 3 correctas (20)
   - correct: índices (base 0) de las opciones correctas
   - Las opciones se mezclan al azar en cada intento (ver app.js).
   ===================================================================== */

const MC_QUESTIONS = [

/* ============================ UNIDAD 1 ============================ */
{
  id: 1, unit: 1, diff: "media", multi: false,
  q: "En el modelo general de comunicación de datos, ¿cuál es la función del TRANSMISOR?",
  options: [
    "Interpretar el mensaje recibido y entregarlo a la aplicación de destino.",
    "Convertir los datos en una señal adecuada para el medio de transmisión.",
    "Seleccionar la ruta que seguirán los paquetes a través de la red.",
    "Almacenar temporalmente la información hasta que el receptor la pida."
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
  explanation: "El modelo es: Fuente (genera la información) → Transmisor (convierte datos en señal) → Sistema de transmisión (medio por el que viaja la señal) → Receptor (reconstruye los datos desde la señal recibida) → Destino (interpreta la información). Las señales asociadas son: m → g(t) → s(t) → r(t) → g'(t) → m'. Si falla cualquier elemento, la comunicación se corta o degrada: por eso cada tema de la materia se puede 'mapear' a una parte de este esquema."
},
{
  id: 3, unit: 1, diff: "media", multi: true,
  q: "¿Cuáles de las siguientes son TAREAS propias de una comunicación de datos según Stallings? (seleccioná todas las correctas)",
  options: [
    "Control de flujo: evitar que el emisor sature al receptor.",
    "Direccionamiento: identificar origen, destino, redes y aplicaciones.",
    "Compilación del código fuente de las aplicaciones de usuario.",
    "Detección y corrección de errores producidos por ruido o interferencias."
  ],
  correct: [0, 1, 3],
  explanation: "Las tareas de la comunicación incluyen: uso del sistema de transmisión, interfaz, generación de señal, sincronización, gestión de intercambio, detección/corrección de errores, control de flujo, direccionamiento, enrutamiento, recuperación, formato de mensajes, seguridad y gestión de red. Compilar programas no es una tarea de comunicación: es del entorno de desarrollo."
},
{
  id: 4, unit: 1, diff: "media", multi: false,
  q: "¿Cuál de las siguientes afirmaciones describe mejor a una LAN?",
  options: [
    "Red que conecta sedes en distintas provincias mediante enlaces contratados a un operador de telecomunicaciones.",
    "Red de área reducida (oficina, edificio, campus), normalmente propiedad de una organización, con altas velocidades.",
    "Red que cubre una ciudad o región metropolitana, típica de un proveedor municipal de fibra óptica.",
    "Red de cobertura continental basada en enlaces satelitales y troncales de larga distancia."
  ],
  correct: [1],
  explanation: "Una LAN (Local Area Network) cubre un área reducida, suele ser propiedad de una organización, ofrece altas velocidades y baja latencia, y usa tecnologías como Ethernet y Wi-Fi. La opción de sedes en provincias describe una WAN, y la de ciudad describe una MAN."
},
{
  id: 5, unit: 1, diff: "media", multi: false,
  q: "¿Cuál es la principal VENTAJA de la conmutación de circuitos frente a la de paquetes?",
  options: [
    "Aprovecha mejor el medio cuando el tráfico es variable o por ráfagas.",
    "No necesita ningún establecimiento previo antes de empezar a transmitir.",
    "Ofrece retardo predecible y ancho de banda reservado durante toda la comunicación.",
    "Permite que los datos de muchos usuarios compartan dinámicamente los enlaces."
  ],
  correct: [2],
  explanation: "En conmutación de circuitos se establece una ruta dedicada ANTES de transmitir y queda reservada toda la comunicación (ej.: telefonía tradicional). Por eso el retardo es predecible y el ancho de banda está garantizado. Su desventaja: desperdicia recursos cuando no se transmite. La eficiencia con tráfico variable y el uso compartido de enlaces son propiedades de la conmutación de paquetes."
},
{
  id: 6, unit: 1, diff: "media", multi: true,
  q: "Sobre la conmutación de PAQUETES, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Usa eficientemente el medio porque los enlaces se comparten dinámicamente.",
    "Garantiza que los paquetes siempre lleguen en orden y sin pérdidas.",
    "Es la base del funcionamiento de Internet.",
    "Cada paquete contiene información de control, como las direcciones."
  ],
  correct: [0, 2, 3],
  explanation: "En conmutación de paquetes los datos se dividen en paquetes que viajan por enlaces compartidos; cada paquete lleva información de control (direcciones). Es eficiente con tráfico variable, escalable y es la base de Internet. Pero el retardo es variable, puede haber pérdida y los paquetes PUEDEN llegar fuera de orden — el reordenamiento lo resuelven capas superiores como TCP."
},
{
  id: 7, unit: 1, diff: "media", multi: false,
  q: "Todo protocolo define tres elementos clave. ¿Cuáles son?",
  options: [
    "Hardware, software y firmware de los equipos que se comunican.",
    "Sintaxis (formato), semántica (significado) y temporización (cuándo).",
    "Cliente, servidor y canal de comunicación entre ambos extremos.",
    "Codificación, modulación y multiplexación de las señales del enlace."
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
    "La interfaz define cómo una capa accede a los servicios de la capa inferior.",
    "Servicio, protocolo e interfaz son tres nombres para el mismo concepto."
  ],
  correct: [2],
  explanation: "SERVICIO: lo que una capa ofrece a la superior (ej. transporte ofrece 'entrega confiable de bytes'). PROTOCOLO: reglas entre entidades PARES de la misma capa en sistemas distintos (ej. TCP entre dos hosts). INTERFAZ: cómo una capa usa a la inferior dentro del MISMO sistema (ej. una aplicación usa sockets). Las dos primeras opciones intercambian las definiciones."
},
{
  id: 9, unit: 1, diff: "media", multi: false,
  q: "Al enviar datos de una aplicación web, ¿cuál es el orden correcto de encapsulamiento?",
  options: [
    "Datos → Trama → Paquete IP → Segmento TCP → Bits/señal",
    "Datos → Segmento TCP → Paquete IP → Trama → Bits/señal",
    "Datos → Paquete IP → Segmento TCP → Trama → Bits/señal",
    "Bits → Trama → Paquete IP → Segmento TCP → Datos"
  ],
  correct: [1],
  explanation: "Cada capa agrega su encabezado a lo que recibe de la capa superior: los datos de aplicación reciben encabezado TCP (→ segmento), luego encabezado IP (→ paquete/datagrama), luego encabezado y trailer Ethernet/Wi-Fi (→ trama), y finalmente se convierten en señales físicas (bits). En recepción ocurre el desencapsulamiento, en orden inverso.",
  widget: "encap"
},
{
  id: 10, unit: 1, diff: "media", multi: false,
  q: "¿Cuál es la función central de la capa de INTERNET del modelo TCP/IP?",
  options: [
    "Dar comunicación confiable entre procesos, con entrega garantizada y en orden.",
    "Permitir la comunicación entre redes diferentes mediante IP, con entrega 'best effort'.",
    "Formar las tramas y controlar el acceso al medio entre nodos vecinos directos.",
    "Convertir los bits en señales eléctricas, ópticas o de radio sobre el medio físico."
  ],
  correct: [1],
  explanation: "La capa de Internet (protocolo IP) interconecta redes heterogéneas: direccionamiento lógico, encaminamiento de paquetes y fragmentación en IPv4. IP es 'best effort': intenta entregar pero NO garantiza entrega, orden ni ausencia de duplicados — la confiabilidad la aporta TCP en la capa de transporte. Las otras opciones describen las capas de transporte, acceso a red y física."
},
{
  id: 11, unit: 1, diff: "media", multi: true,
  q: "¿Cuáles de estas características corresponden a TCP? (seleccioná todas las correctas)",
  options: [
    "Es orientado a conexión: usa el three-way handshake para establecerla.",
    "Entrega los datos en orden gracias a los números de secuencia.",
    "Tiene sobrecarga mínima porque no usa confirmaciones ni retransmisiones.",
    "Es el protocolo preferido para streaming en vivo por su baja latencia."
  ],
  correct: [0, 1],
  explanation: "TCP es orientado a conexión (SYN, SYN+ACK, ACK), confiable (ACKs y retransmisiones), ordenado (números de secuencia), con control de flujo (ventana de recepción) y de congestión. La 'sobrecarga mínima sin confirmaciones' describe a UDP, y para streaming en vivo se suele preferir UDP justamente por su menor latencia."
},
{
  id: 12, unit: 1, diff: "media", multi: true,
  q: "¿Cuáles de estas aplicaciones son usos TÍPICOS de UDP? (seleccioná todas las correctas)",
  options: [
    "Consultas DNS, que son cortas y toleran reintentar si se pierden.",
    "VoIP y videollamadas en tiempo real, donde importa la baja latencia.",
    "Transferir un archivo que debe llegar completo, sin que la aplicación maneje pérdidas.",
    "Enviar un correo electrónico mediante SMTP hasta el servidor de correo."
  ],
  correct: [0, 1],
  explanation: "UDP es simple, sin conexión y de baja sobrecarga: ideal para DNS (consultas cortas), VoIP, streaming, videojuegos y protocolos en tiempo real donde la baja latencia importa más que la entrega perfecta (QUIC también corre sobre UDP). Para un archivo completo o el correo (SMTP) se usa TCP, que garantiza entrega y orden."
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
    "Indica el tiempo en segundos que el paquete puede permanecer en el buffer del receptor.",
    "Cada router que reenvía el paquete lo decrementa; si llega a cero, el paquete se descarta.",
    "Es el código verificador que detecta errores en los datos que transporta el paquete.",
    "Indica la cantidad total de fragmentos que componen el paquete IP original."
  ],
  correct: [1],
  explanation: "TTL (Time To Live) evita que un paquete quede circulando indefinidamente por la red (por ejemplo, en un bucle de enrutamiento): cada router lo decrementa en 1 y, al llegar a 0, el paquete se descarta. El checksum de IPv4 cubre solo la CABECERA, y la fragmentación se maneja con los campos identificación, flags (DF/MF) y offset."
},
{
  id: 15, unit: 1, diff: "dificil", multi: true,
  q: "¿Cuáles afirmaciones sobre IPv6 son correctas frente a IPv4? (seleccioná todas las correctas)",
  options: [
    "Usa direcciones de 128 bits en lugar de 32.",
    "Elimina el checksum de cabecera que tenía IPv4.",
    "Mejora la autoconfiguración y el manejo de extensiones.",
    "Reduce el espacio de direcciones para simplificar el enrutamiento."
  ],
  correct: [0, 1, 2],
  explanation: "IPv6 AMPLÍA el espacio de direcciones con 128 bits (IPv4 usa 32), elimina el checksum de cabecera (lo verifican la capa de enlace y la de transporte), y mejora autoconfiguración, jerarquía de direccionamiento y cabeceras de extensión. La última opción es lo contrario de su objetivo principal."
},
{
  id: 16, unit: 1, diff: "media", multi: false,
  q: "En el modelo OSI, ¿qué capa se encarga de la traducción de formatos, el cifrado y la compresión?",
  options: [
    "Capa 5 — Sesión, que gestiona el diálogo entre las aplicaciones.",
    "Capa 6 — Presentación, que define la representación de los datos.",
    "Capa 7 — Aplicación, que da servicios de red al usuario final.",
    "Capa 4 — Transporte, que comunica procesos de extremo a extremo."
  ],
  correct: [1],
  explanation: "La capa 6 (Presentación) se ocupa de la representación de los datos: traducción de formatos (ASCII, UTF-8, JPEG), cifrado (TLS conceptualmente) y compresión. La capa 5 (Sesión) gestiona diálogos y sesiones; la 7 (Aplicación) da servicios de red a las aplicaciones (HTTP, DNS, SMTP); la 4 (Transporte) da comunicación extremo a extremo (TCP/UDP). OSI es un modelo TEÓRICO de referencia: ordena conceptos, aunque en la práctica se usa TCP/IP."
},
{
  id: 17, unit: 1, diff: "dificil", multi: true,
  q: "Sobre CSMA/CD y Ethernet, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Carrier Sense significa escuchar si el medio está libre antes de transmitir.",
    "Tras una colisión se aplica backoff exponencial: esperas aleatorias crecientes.",
    "Collision Detection es el mecanismo que corrige los bits dañados usando CRC.",
    "En Ethernet conmutada full-duplex las colisiones prácticamente desaparecen."
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
    "Descarga de archivos grandes."
  ],
  correct: [0, 2],
  explanation: "El tráfico inelástico NO tolera bien retardo, jitter ni pérdida: voz en tiempo real, videollamadas, streaming en vivo y videojuegos online; requiere mínimos de latencia y variación de retardo. El correo, la navegación web y las descargas de archivos son tráfico ELÁSTICO: si hay congestión pueden esperar o bajar velocidad sin romper el servicio."
},
{
  id: 19, unit: 1, diff: "media", multi: true,
  q: "Sobre la diferencia entre dirección IP y dirección MAC, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "La MAC identifica una interfaz dentro de la red local y se usa en la capa de enlace.",
    "La IP es una dirección lógica que permite enrutar paquetes entre redes distintas.",
    "La IP viene grabada de fábrica en la placa de red y no puede cambiarse.",
    "Ambas son direcciones de la capa de transporte, como los puertos."
  ],
  correct: [0, 1],
  explanation: "La dirección MAC es física: identifica una interfaz (placa de red) DENTRO de la red local y opera en la capa de enlace; viene asignada de fábrica. La dirección IP es LÓGICA: identifica un host a nivel de red y permite enrutar entre redes; se asigna por configuración o DHCP (la que viene de fábrica es la MAC, no la IP). Los puertos —no estas direcciones— identifican aplicaciones en la capa de transporte. Las tres cosas juntas (MAC + IP + puerto) permiten llegar a la red local, a la red remota y a la aplicación correcta."
},
{
  id: 20, unit: 1, diff: "media", multi: false,
  q: "¿Qué es el ACK (acuse de recibo) y qué rol cumple en TCP?",
  options: [
    "Es el aviso con que el receptor confirma qué datos recibió; si no llega a tiempo, el emisor retransmite.",
    "Es el mensaje con que el emisor pide permiso de transmisión al router más cercano antes de enviar cada segmento.",
    "Es el paquete especial con que ambos extremos cierran definitivamente una conexión TCP que ya estaba establecida.",
    "Es el campo de la cabecera IP que indica la prioridad con que los routers deben encolar y reenviar el paquete."
  ],
  correct: [0],
  explanation: "El ACK (acknowledgement) es la confirmación del receptor indicando qué datos llegaron correctamente (en TCP, el número de ACK indica el próximo byte esperado). Si el emisor no recibe el ACK dentro de un tiempo (timeout del temporizador de retransmisión), asume pérdida y RETRANSMITE. Junto con los números de secuencia, el ACK es la base de la entrega confiable de TCP. El cierre de conexión usa FIN, no ACK solo."
},

/* ============================ UNIDAD 2 ============================ */
{
  id: 21, unit: 2, diff: "media", multi: true,
  q: "Sobre los sentidos de transmisión, ¿cuáles asociaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Televisión abierta tradicional → simplex.",
    "Walkie-talkie → half-duplex.",
    "Radio FM comercial → full-duplex.",
    "Ethernet conmutada moderna → half-duplex obligatorio."
  ],
  correct: [0, 1],
  explanation: "SIMPLEX: una sola dirección (TV abierta, radio FM — el oyente no transmite de vuelta). HALF-DUPLEX: ambas direcciones pero no simultáneas (walkie-talkie). FULL-DUPLEX: ambas direcciones al mismo tiempo (telefonía, Ethernet conmutada moderna, que trabaja justamente en full-duplex con enlaces dedicados)."
},
{
  id: 22, unit: 2, diff: "media", multi: false,
  q: "Un módem y el Wi-Fi (con ASK/FSK/PSK/QAM) son ejemplos de la combinación:",
  options: [
    "Datos digitales transmitidos mediante una señal digital.",
    "Datos digitales transmitidos mediante una señal analógica.",
    "Datos analógicos transmitidos mediante una señal digital.",
    "Datos analógicos transmitidos mediante una señal analógica."
  ],
  correct: [1],
  explanation: "Las cuatro combinaciones son: digital→digital (codificación de línea: NRZ, AMI, Manchester — Ethernet en banda base), digital→analógica (MODULACIÓN digital: ASK, FSK, PSK, QAM — módem, Wi-Fi), analógico→digital (digitalización: PCM, delta — voz digitalizada), analógico→analógica (modulación analógica: AM, FM — radio). El módem modula datos digitales sobre una portadora analógica."
},
{
  id: 23, unit: 2, diff: "media", multi: false,
  q: "En la expresión s(t) = A · sen(2πft + φ), ¿qué representa cada parámetro?",
  options: [
    "A = atenuación, f = fase de la onda, φ = frecuencia en Hz",
    "A = amplitud pico, f = frecuencia en Hz, φ = fase de la onda",
    "A = ancho de banda, f = período en segundos, φ = longitud de onda",
    "A = amplitud media, f = factor de ruido, φ = potencia en watts"
  ],
  correct: [1],
  explanation: "A es la amplitud pico (intensidad, en volts para señales eléctricas), f la frecuencia (ciclos por segundo, en Hz) y φ la fase (desplazamiento relativo de la onda, clave en PSK y QAM). Derivados: período T = 1/f y longitud de onda λ = v/f. Probá modificar cada parámetro en el simulador para ver su efecto.",
  widget: "sine"
},
{
  id: 24, unit: 2, diff: "media", multi: false,
  q: "Si una señal tiene frecuencia f = 1 kHz, su período T es:",
  options: [
    "1 segundo, porque el período es el inverso del kilohertz.",
    "1 milisegundo, porque T = 1/f = 1/1000 s.",
    "1 microsegundo, porque T = 1/f² para señales periódicas.",
    "0,1 segundos, porque un ciclo dura una décima de segundo."
  ],
  correct: [1],
  explanation: "T = 1/f. Con f = 1 kHz = 1000 Hz: T = 1/1000 s = 1 ms. El período es el tiempo que dura un ciclo completo; a mayor frecuencia, ciclos más cortos. Verificalo en el simulador moviendo la frecuencia.",
  widget: "sine"
},
{
  id: 25, unit: 2, diff: "dificil", multi: false,
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
  id: 26, unit: 2, diff: "media", multi: false,
  q: "¿Qué muestra el dominio del TIEMPO y qué muestra el dominio de la FRECUENCIA de una señal?",
  options: [
    "Tiempo: la energía aportada por cada frecuencia del espectro. Frecuencia: la amplitud instantánea de la señal en cada momento.",
    "Tiempo: cómo varía la amplitud a lo largo del tiempo. Frecuencia: qué frecuencias componen la señal y con qué intensidad.",
    "Tiempo: el espectro completo con todos los armónicos de la señal. Frecuencia: el período y la fase de la onda portadora.",
    "Ambos muestran exactamente la misma información: solo cambia la unidad de medida con que se rotulan los ejes del gráfico."
  ],
  correct: [1],
  explanation: "El dominio del TIEMPO muestra cómo cambia la señal con el tiempo (un osciloscopio: amplitud vs. tiempo). El dominio de la FRECUENCIA muestra qué frecuencias componen la señal y con qué intensidad (un analizador de espectro: energía vs. frecuencia). Idea clave: una señal compleja en el tiempo puede ser suma de senoidales simples en frecuencia (Fourier).",
  widget: "fourier"
},
{
  id: 27, unit: 2, diff: "media", multi: false,
  q: "¿Por qué una señal cuadrada PERFECTA requeriría un ancho de banda infinito para transmitirse fielmente?",
  options: [
    "Porque su amplitud se vuelve infinita en los flancos de subida y de bajada, y ningún transmisor real puede generar esos picos.",
    "Porque según Fourier está compuesta por infinitos armónicos, y las transiciones abruptas dependen de los de mayor frecuencia.",
    "Porque su frecuencia fundamental es infinita al no ser una señal senoidal pura, y el canal solo transmite frecuencias finitas.",
    "Porque su componente DC ocupa todo el espectro disponible y no deja lugar en el canal para el resto de las componentes."
  ],
  correct: [1],
  explanation: "Por Fourier, una cuadrada perfecta = fundamental + INFINITOS armónicos impares (f, 3f, 5f, ...). Las 'esquinas' perfectas requieren los armónicos de frecuencia más alta: para transmitirlas TODAS haría falta ancho de banda infinito. Como todo canal real es limitado, filtra los armónicos superiores y la señal llega redondeada — alcanza con conservar los primeros armónicos para que el receptor distinga los bits. Por eso, a mayor velocidad de datos, mayor ancho de banda necesario. Jugá con la cantidad de armónicos en el simulador.",
  widget: "fourier"
},
{
  id: 28, unit: 2, diff: "media", multi: false,
  q: "El ancho de banda ABSOLUTO de una señal se define como:",
  options: [
    "La diferencia entre la frecuencia máxima y la mínima presentes en la señal.",
    "La cantidad máxima de bits por segundo que la señal puede transportar.",
    "La potencia total de la señal medida en el dominio de la frecuencia.",
    "La frecuencia central de la portadora utilizada para transmitirla."
  ],
  correct: [0],
  explanation: "El ancho de banda ABSOLUTO es B = fmax − fmin: el rango de frecuencias que componen la señal (su espectro). El ancho de banda EFECTIVO es el rango donde se concentra la mayor parte de la energía — es el que se usa en la práctica, porque las señales reales tienen componentes muy débiles fuera del rango principal. No confundir con la velocidad de datos (bps): están relacionadas (más bps exige más Hz) pero no son lo mismo."
},
{
  id: 29, unit: 2, diff: "media", multi: false,
  q: "¿Qué es la componente DC de una señal y por qué es un problema?",
  options: [
    "Es la frecuencia máxima presente en el espectro de la señal; el problema es que satura los amplificadores de potencia.",
    "Es la componente de frecuencia cero (valor promedio); muchos medios y equipos no la transmiten bien.",
    "Es el ruido térmico de base que acompaña a toda señal en el canal; se elimina fácilmente con filtros pasa-altos.",
    "Es la diferencia entre la amplitud máxima y la mínima de la señal; el problema es que limita el rango dinámico."
  ],
  correct: [1],
  explanation: "La componente DC (continua) es la parte de frecuencia CERO de la señal: su valor promedio. Es problemática porque transformadores y acoples capacitivos no transmiten continua, y porque suele indicar largas secuencias sin transiciones (mala sincronización). Ej.: NRZ con muchos unos seguidos mantiene un nivel constante → promedio distinto de cero. Códigos como AMI o Manchester la eliminan.",
  widget: "linecode"
},
{
  id: 30, unit: 2, diff: "media", multi: true,
  q: "¿Cuáles son VENTAJAS de la transmisión digital frente a la analógica? (seleccioná todas las correctas)",
  options: [
    "Los repetidores regeneran los bits y eliminan el ruido acumulado.",
    "Permite aplicar detección y corrección de errores a los datos.",
    "El amplificador eleva la señal y también el ruido que la acompaña.",
    "Facilita la multiplexación y la integración de voz, datos y video."
  ],
  correct: [0, 1, 3],
  explanation: "Ventajas digitales: regeneración (un repetidor reconstruye los bits y genera señal limpia, sin acumular ruido), detección/corrección de errores, multiplexación más fácil, cifrado y compresión simples, e integración de servicios. Que el amplificador amplifique TAMBIÉN el ruido es justamente el problema de la transmisión ANALÓGICA, no una ventaja digital."
},
{
  id: 31, unit: 2, diff: "media", multi: false,
  q: "¿Cuál es la diferencia clave entre un amplificador y un repetidor/regenerador?",
  options: [
    "No hay diferencia real entre ambos: son dos nombres comerciales distintos para exactamente el mismo tipo de equipo.",
    "El amplificador eleva la potencia de todo (ruido incluido); el regenerador reconstruye los bits y genera una señal limpia.",
    "El repetidor solo puede usarse en enlaces de fibra óptica monomodo; el amplificador funciona en cualquier medio guiado.",
    "El amplificador detecta y corrige los errores de bit acumulados; el repetidor se limita a elevar la potencia de la señal."
  ],
  correct: [1],
  explanation: "El amplificador (transmisión analógica) eleva la potencia de TODO lo que recibe, ruido incluido: el ruido se acumula etapa tras etapa. El repetidor/regenerador (transmisión digital) decide qué bits llegaron y genera una señal nueva y limpia, eliminando el ruido acumulado. Esta es una de las grandes ventajas de la transmisión digital."
},
{
  id: 32, unit: 2, diff: "dificil", multi: false,
  q: "La interferencia intersimbólica (ISI) es consecuencia directa de:",
  options: [
    "El ruido térmico que genera el propio receptor del enlace: al amplificar la señal recibida también amplifica sus errores.",
    "La distorsión de retardo: componentes de distinta frecuencia llegan en tiempos distintos y un símbolo se 'derrama' sobre el siguiente.",
    "La componente DC que la señal va acumulando a lo largo del medio guiado, que desplaza el nivel de decisión del receptor.",
    "El uso de modulaciones QAM con demasiados niveles de amplitud, cuyos símbolos vecinos resultan imposibles de separar."
  ],
  correct: [1],
  explanation: "La distorsión de retardo ocurre cuando distintas componentes de frecuencia viajan a velocidades diferentes (es exclusiva/típica de medios GUIADOS). El resultado es que un pulso se ensancha e interfiere con los símbolos vecinos: ISI. El receptor ya no distingue claramente dónde termina un bit y empieza el otro, lo que limita la velocidad de señalización. La multitrayectoria inalámbrica también produce ISI."
},
{
  id: 33, unit: 2, diff: "media", multi: true,
  q: "Sobre los tipos de RUIDO, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "El ruido térmico se debe a la agitación de electrones y está presente en todos los sistemas.",
    "El ruido de intermodulación aparece por no linealidades: f1 y f2 generan componentes f1+f2 y f1−f2.",
    "El ruido impulsivo es continuo y de baja amplitud, casi inofensivo para los datos digitales.",
    "La diafonía (crosstalk) es la inducción de la señal de un par sobre otro, como en cables UTP."
  ],
  correct: [0, 1, 3],
  explanation: "Ruido térmico: agitación térmica de electrones, presente siempre, modelado como ruido blanco. Intermodulación: medios no lineales mezclan frecuencias (f1±f2). Diafonía: acoplamiento entre pares cercanos (NEXT cerca del transmisor, FEXT en el extremo lejano). El ruido IMPULSIVO es lo contrario de lo que dice la opción: picos de ALTA amplitud y CORTA duración (motores, relés, descargas) — especialmente dañino para datos digitales porque un pico breve corrompe varios bits."
},
{
  id: 34, unit: 2, diff: "media", multi: false,
  q: "Si la potencia de una señal se DUPLICA, la ganancia en dB es aproximadamente:",
  options: [
    "+2 dB, porque el dB es proporcional a la potencia.",
    "+3 dB, porque 10·log₁₀(2) ≈ 3.",
    "+10 dB, porque duplicar es un orden de magnitud.",
    "+6 dB, porque se suman 3 dB por cada conductor."
  ],
  correct: [1],
  explanation: "dB = 10·log₁₀(P1/P2). Si P1/P2 = 2 → 10·log₁₀(2) ≈ 3 dB. Reglas útiles: +3 dB duplica, −3 dB mitad, +10 dB ×10, +20 dB ×100, +30 dB ×1000. La gracia de los dB: las multiplicaciones de ganancias/pérdidas en cascada se convierten en sumas.",
  widget: "db"
},
{
  id: 35, unit: 2, diff: "media", multi: false,
  q: "Un técnico mide −3 dB entre la entrada y la salida de un tramo de cable. ¿Cómo se interpreta?",
  options: [
    "El tramo PIERDE potencia: a la salida queda aproximadamente la mitad de la potencia de entrada.",
    "El tramo GANA potencia: a la salida hay aproximadamente el triple de la potencia que había en la entrada.",
    "No se puede saber si el tramo gana o pierde potencia: el dB no indica el sentido del cambio, solo su magnitud.",
    "La señal se invirtió de polaridad al atravesar el tramo, pero conserva exactamente la misma potencia de entrada."
  ],
  correct: [0],
  explanation: "El signo NEGATIVO indica pérdida (atenuación): la potencia de salida es menor que la de entrada. Como −3 dB ≈ 10·log₁₀(0,5), quedó aproximadamente la MITAD de la potencia. Es el caso típico de un cable o un divisor: cada −3 dB adicional vuelve a dividir la potencia por 2 (−6 dB → un cuarto; −10 dB → una décima parte). Probalo en el simulador.",
  widget: "db"
},
{
  id: 36, unit: 2, diff: "media", multi: false,
  q: "¿A cuántos dBm equivale una potencia de 1 W?",
  options: [
    "0 dBm, porque 1 W es la referencia de la escala.",
    "10 dBm, porque 1 W son 10 mW de potencia.",
    "30 dBm, porque 1 W = 1000 mW y 10·log₁₀(1000) = 30.",
    "60 dBm, porque se suman 30 dB por cada escala de mil."
  ],
  correct: [2],
  explanation: "dBm = 10·log₁₀(P/1mW). 1 W = 1000 mW → 10·log₁₀(1000) = 30 dBm. Referencias: 1 mW = 0 dBm; 10 mW = 10 dBm; 100 mW = 20 dBm. Relación con dBW: dBm = dBW + 30. En Wi-Fi se reciben valores NEGATIVOS de dBm porque la potencia recibida es menor a 1 mW.",
  widget: "db"
},
{
  id: 37, unit: 2, diff: "dificil", multi: false,
  q: "Un enlace recibe señal de −60 dBm con un piso de ruido de −90 dBm. ¿Cuál es el SNR y qué significa en escala lineal?",
  options: [
    "SNR = −150 dB; la señal es bastante más débil que el ruido.",
    "SNR = 30 dB; la señal es 1000 veces más potente que el ruido.",
    "SNR = 30 dB; la señal es 30 veces más potente que el ruido.",
    "SNR = 150 dB; la señal es 10¹⁵ veces más potente que el ruido."
  ],
  correct: [1],
  explanation: "Con ambas potencias en dBm: SNRdB = Señal − Ruido = −60 − (−90) = 30 dB. En lineal: 10^(30/10) = 1000 → la señal es 1000 veces más potente que el ruido. Guía: 10 dB = ×10, 20 dB = ×100, 30 dB = ×1000. Mayor SNR permite usar modulaciones más densas (64-QAM, 256-QAM).",
  widget: "db"
},
{
  id: 38, unit: 2, diff: "media", multi: false,
  q: "¿Cuál de los siguientes fenómenos NO es una perturbación de la transmisión de datos?",
  options: [
    "La atenuación de la señal a lo largo del medio.",
    "El ruido térmico presente en el canal y los equipos.",
    "La multiplexación de varios canales en un mismo enlace.",
    "La distorsión de retardo de las componentes de frecuencia."
  ],
  correct: [2],
  explanation: "Las perturbaciones (alteraciones) de la transmisión son: ATENUACIÓN (y distorsión de atenuación), DISTORSIÓN DE RETARDO (que causa ISI) y RUIDO (térmico, intermodulación, diafonía, impulsivo). La MULTIPLEXACIÓN no es una perturbación: es una TÉCNICA deliberada para combinar varias señales en un mismo enlace y usarlo eficientemente (FDM, TDM, WDM)."
},
{
  id: 39, unit: 2, diff: "media", multi: false,
  q: "Según Nyquist, ¿cuál es la capacidad de un canal IDEAL (sin ruido) de 3 kHz usando 2 niveles de señal?",
  options: [
    "3000 bps, igual al ancho de banda del canal.",
    "6000 bps, porque C = 2B·log₂(2) = 2·3000·1.",
    "12000 bps, porque cada nivel duplica la capacidad.",
    "1500 bps, la mitad del ancho de banda disponible."
  ],
  correct: [1],
  explanation: "Nyquist: C = 2B·log₂(M). Con B = 3000 Hz y M = 2 niveles: C = 2·3000·log₂(2) = 6000·1 = 6000 bps. Con señalización binaria, la capacidad es el doble del ancho de banda. Probá en el simulador cómo crece C al agregar niveles.",
  widget: "ns"
},
{
  id: 40, unit: 2, diff: "dificil", multi: false,
  q: "El mismo canal de 3 kHz sin ruido, pero ahora con 16 niveles de señal, tiene capacidad:",
  options: [
    "12.000 bps, porque 16 niveles duplican la capacidad binaria.",
    "48.000 bps, porque la capacidad crece linealmente con M.",
    "24.000 bps, porque log₂(16) = 4 bits por símbolo.",
    "96.000 bps, porque cada nivel aporta 6000 bps adicionales."
  ],
  correct: [2],
  explanation: "C = 2B·log₂(M) = 2·3000·log₂(16) = 6000·4 = 24.000 bps. Cada símbolo de 16 niveles transporta log₂(16) = 4 bits. Limitación: en un canal real no se puede aumentar M indefinidamente, porque los niveles quedan tan juntos que el ruido los confunde — ahí entra Shannon.",
  widget: "ns"
},
{
  id: 41, unit: 2, diff: "dificil", multi: false,
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
  id: 42, unit: 2, diff: "dificil", multi: false,
  q: "EJERCICIO (estilo campus): un canal telefónico tiene B = 4000 Hz y SNR = 20 dB. ¿Cuál es la capacidad máxima según Shannon?",
  options: [
    "≈ 26.600 bps, porque SNR lineal = 100 y C = 4000·log₂(101).",
    "≈ 80.000 bps, porque C = B·SNRdB = 4000·20.",
    "≈ 8.000 bps, porque C = 2B con señalización binaria.",
    "≈ 53.200 bps, porque C = 2B·log₂(1+SNR) duplica el resultado."
  ],
  correct: [0],
  explanation: "Paso 1 — SNR a lineal: 10^(20/10) = 100. Paso 2 — Shannon: C = B·log₂(1+SNR) = 4000·log₂(101) ≈ 4000·6,66 ≈ 26.600 bps. Errores típicos: usar el SNR en dB directamente dentro de la fórmula (hay que pasarlo a lineal) o confundir la fórmula de Shannon (B·log₂(1+SNR)) con la de Nyquist (2B·log₂(M)).",
  widget: "ns"
},
{
  id: 43, unit: 2, diff: "dificil", multi: false,
  q: "(Continuación) Para ese canal (B = 4000 Hz, Shannon ≈ 26,6 kbps), ¿qué valor de M en Nyquist se aproxima más al límite SIN superarlo, y por qué no puede usarse el inmediato superior?",
  options: [
    "M = 8: da 24 kbps; con M = 16 Nyquist daría 32 kbps, que supera el techo de Shannon y no sería confiable con ese ruido.",
    "M = 16: da 32 kbps; siempre conviene elegir el valor de M que entregue la capacidad más alta posible según Nyquist.",
    "M = 4: da 16 kbps; con más de 4 niveles de señal ningún canal telefónico real puede funcionar de manera estable.",
    "M = 2: da 8 kbps; la fórmula de Nyquist solo admite señalización binaria cuando el canal presenta ruido apreciable."
  ],
  correct: [0],
  explanation: "Nyquist: C = 2B·log₂(M) = 8000·log₂(M). Con M = 8 → 8000·3 = 24.000 bps (por debajo de los 26,6 kbps de Shannon ✔). Con M = 16 → 8000·4 = 32.000 bps, que SUPERA el techo de Shannon: el ruido del canal (SNR = 20 dB) no permite distinguir 16 niveles de forma confiable — los niveles quedan tan juntos que el ruido los confunde y la tasa de error se dispara. Por eso Shannon impone el límite y Nyquist ayuda a elegir cuántos niveles usar para acercarse a él.",
  widget: "ns"
},
{
  id: 44, unit: 2, diff: "dificil", multi: true,
  q: "Sobre Nyquist y Shannon, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Nyquist analiza un canal ideal SIN ruido: C = 2B·log₂(M).",
    "Shannon incorpora el ruido: C = B·log₂(1+SNR) y fija el techo teórico.",
    "Aumentar el SNR sube la capacidad de forma logarítmica; aumentar B lo hace casi linealmente.",
    "Nyquist indica el valor máximo de M que el ruido del canal permite usar."
  ],
  correct: [0, 1, 2],
  explanation: "Nyquist (canal ideal): C = 2B·log₂(M) — responde cuántos bits puedo enviar con M niveles. Shannon (canal real): C = B·log₂(1+SNR) — el techo absoluto con ese ruido. B aporta capacidad casi lineal; SNR, logarítmica. Nyquist NO considera ruido, por lo tanto no puede decir qué M es viable: es Shannon quien impone el límite, y Nyquist ayuda a estimar cuántos niveles harían falta para acercarse.",
  widget: "ns"
},
{
  id: 45, unit: 2, diff: "dificil", multi: false,
  q: "¿Por qué las modulaciones con más bits por símbolo (ej. 256-QAM) requieren mayor Eb/N0 para mantener la misma BER?",
  options: [
    "Porque transmiten cada símbolo a menor velocidad y el ruido del canal actúa durante más tiempo sobre cada bit.",
    "Porque los puntos de la constelación quedan más cerca entre sí y el ruido los confunde con mayor facilidad.",
    "Porque usan frecuencias portadoras más altas, que sufren mayor atenuación y pérdida en el medio de transmisión.",
    "Porque el receptor está obligado a demodular en modo half-duplex, lo que duplica el tiempo de procesamiento."
  ],
  correct: [1],
  explanation: "Eb/N0 relaciona la energía por bit con la densidad espectral de ruido. Al meter más bits por símbolo, los puntos de la constelación I/Q se aprietan: la distancia entre símbolos vecinos disminuye y un mismo nivel de ruido produce más decisiones erróneas. Por eso 256-QAM exige mucho mejor SNR/Eb-N0 que QPSK para la misma tasa de error (BER).",
  widget: "qam"
},

/* ============================ UNIDAD 3 ============================ */
{
  id: 46, unit: 3, diff: "media", multi: false,
  q: "¿Por qué se TRENZAN los pares de cobre en un cable de par trenzado?",
  options: [
    "Para que el cable resulte más flexible y sencillo de instalar en los ductos y canalizaciones de los edificios.",
    "Porque la torsión hace que las interferencias afecten a ambos conductores por igual y se cancelen en recepción diferencial.",
    "Para aumentar la velocidad de propagación de las señales eléctricas, que crece con la cantidad de vueltas por metro.",
    "Para reducir la cantidad de cobre utilizado en la fabricación y así abaratar el costo final de cada tramo de cable."
  ],
  correct: [1],
  explanation: "Al trenzar los dos conductores, una interferencia externa induce señales casi idénticas en ambos; como el receptor mide la DIFERENCIA entre los conductores (recepción diferencial), ese ruido común se cancela en gran parte. También reduce la diafonía entre pares vecinos. Es la razón por la que el UTP, sin blindaje, funciona tan bien en LANs."
},
{
  id: 47, unit: 3, diff: "media", multi: true,
  q: "Sobre la fibra óptica frente a los medios de cobre, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Es el medio guiado con mayor inmunidad a las interferencias electromagnéticas (EMI).",
    "Tiene baja atenuación, lo que permite enlaces de larga distancia.",
    "Sus conectores y empalmes son más simples y baratos que los del cobre.",
    "Ofrece un ancho de banda enormemente superior al del par trenzado."
  ],
  correct: [0, 1, 3],
  explanation: "La fibra transmite LUZ guiada por reflexión interna total: al no circular señales eléctricas, es INMUNE a EMI (clásica pregunta: es el medio con mayor inmunidad). Además tiene altísimo ancho de banda, baja atenuación (largas distancias), baja tasa de error y es difícil de interceptar. Sus DESVENTAJAS: empalmes y conectores más delicados y costosos, equipos ópticos caros, instalación especializada."
},
{
  id: 48, unit: 3, diff: "dificil", multi: false,
  q: "¿Qué fenómeno limita la distancia y velocidad de la fibra MULTIMODO frente a la monomodo?",
  options: [
    "La opacidad del núcleo de vidrio, que aumenta cuanto más grande es su diámetro y absorbe parte de la luz transmitida.",
    "La dispersión modal: los rayos recorren caminos distintos y llegan en tiempos diferentes, ensanchando el pulso.",
    "La imposibilidad de usar conectores mecánicos en fibras multimodo, que obliga a fusionar cada empalme del enlace.",
    "La mayor atenuación del revestimiento (cladding) en las longitudes de onda infrarrojas que usan los emisores."
  ],
  correct: [1],
  explanation: "En la multimodo el núcleo permite MÚLTIPLES trayectorias de luz; los rayos llegan en tiempos distintos (dispersión modal) y el pulso se ensancha, limitando distancia y velocidad. La monomodo, con núcleo muy pequeño, permite esencialmente un solo modo: mayor distancia y ancho de banda, pero exige láseres y alineación más precisa. Ventanas ópticas típicas: 850, 1310 y 1550 nm (esta última, de menor atenuación, domina en larga distancia y WDM)."
},
{
  id: 49, unit: 3, diff: "media", multi: true,
  q: "Sobre las microondas TERRESTRES, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Requieren línea de vista despejada entre las antenas del enlace.",
    "Atraviesan los obstáculos mejor que las ondas de radio de baja frecuencia.",
    "La lluvia las afecta menos cuanto mayor es la frecuencia utilizada.",
    "Usan antenas omnidireccionales para dar cobertura en toda la zona."
  ],
  correct: [0],
  explanation: "Las microondas terrestres (2–40 GHz) son enlaces DIRECCIONALES punto a punto con antenas parabólicas: requieren línea de vista y alineación (única correcta). Las ondas de RADIO de menor frecuencia atraviesan obstáculos MEJOR que las microondas (no al revés). La atenuación por lluvia CRECE con la frecuencia (especialmente sobre 10 GHz). Y las antenas omnidireccionales son típicas de radiodifusión, no de enlaces punto a punto."
},
{
  id: 50, unit: 3, diff: "dificil", multi: false,
  q: "Según la fórmula de pérdida en espacio libre FSPL(dB) = 32,44 + 20·log₁₀(d_km) + 20·log₁₀(f_MHz), duplicar la distancia del enlace:",
  options: [
    "Duplica el valor total de la pérdida expresada en dB.",
    "Aumenta la pérdida en unos 3 dB adicionales.",
    "Aumenta la pérdida en unos 6 dB adicionales.",
    "No cambia la pérdida mientras la frecuencia sea constante."
  ],
  correct: [2],
  explanation: "El término de distancia es 20·log₁₀(d): al duplicar d, suma 20·log₁₀(2) ≈ 6 dB. Lo mismo pasa al duplicar la frecuencia: +6 dB. Por eso los enlaces largos y de frecuencias altas necesitan antenas de mayor ganancia o más potencia. Probalo en el simulador.",
  widget: "fspl"
},
{
  id: 51, unit: 3, diff: "dificil", multi: true,
  q: "Sobre la propagación inalámbrica, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "Como regla práctica, se busca despejar al menos el 60% de la primera zona de Fresnel.",
    "La multitrayectoria puede causar desvanecimiento, interferencia destructiva e ISI.",
    "La zona de Fresnel solo es relevante en enlaces de fibra óptica monomodo.",
    "Si las antenas se ven entre sí, el enlace ya no sufre ninguna pérdida adicional."
  ],
  correct: [0, 1],
  explanation: "No alcanza con que las antenas 'se vean': la zona de Fresnel (región elipsoidal alrededor del camino directo) debe estar mayormente despejada (~60% de la primera zona) para evitar difracción y pérdidas. La multitrayectoria (reflexiones, difracción) genera desvanecimiento, variación rápida de señal e ISI; OFDM, diversidad y MIMO la mitigan o incluso la aprovechan. La fibra es un medio GUIADO: Fresnel no aplica.",
  widget: "fspl"
},
{
  id: 52, unit: 3, diff: "media", multi: false,
  q: "¿Qué característica distintiva tiene el código Manchester y qué costo paga por ella?",
  options: [
    "Usa tres niveles de voltaje para representar los datos, a cambio de necesitar mayor potencia de transmisión que NRZ.",
    "Garantiza una transición en el medio de cada bit (sincronización y sin DC), a cambio de requerir hasta el doble de ancho de banda.",
    "Elimina todas las transiciones innecesarias para ahorrar espectro, a cambio de que el receptor pierda la señal de reloj.",
    "Solo admite secuencias de datos sin ceros consecutivos, a cambio de alcanzar la máxima velocidad de señalización posible."
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
    "Garantiza transiciones incluso con largas cadenas de ceros consecutivos.",
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
    "Eliminan los ceros del flujo de datos antes de transmitir, comprimiendo la señal, y los reinsertan del lado del receptor.",
    "Sustituyen las cadenas (8 ceros en B8ZS, 4 en HDB3) por patrones con violaciones bipolares intencionales que el receptor reconoce y deshace.",
    "Aumentan gradualmente la potencia de transmisión mientras dura la secuencia de ceros, para que el receptor no pierda la señal.",
    "Conmutan temporalmente a codificación Manchester durante la cadena de ceros y vuelven a AMI cuando aparece el siguiente uno."
  ],
  correct: [1],
  explanation: "Son técnicas de scrambling: B8ZS reemplaza 8 ceros por un patrón con violaciones (ej. 000+−0−+ si el último pulso fue positivo); HDB3 evita más de 3 ceros usando patrones 000V o B00V según la polaridad y paridad de pulsos. El receptor reconoce la violación como SUSTITUCIÓN (no como error) y reconstruye los ceros originales. Así se mantiene la sincronización y el balance DC sin reducir la velocidad de datos."
},
{
  id: 55, unit: 3, diff: "media", multi: false,
  q: "Un módem QPSK transmite a 9600 bps. ¿Cuál es su velocidad de señalización en baudios?",
  options: [
    "9600 baudios, porque cada bit es un símbolo de la portadora.",
    "4800 baudios, porque QPSK transporta 2 bits por símbolo.",
    "19200 baudios, porque QPSK duplica la tasa de señalización.",
    "2400 baudios, porque QPSK transporta 4 bits por símbolo."
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
    "En 64-QAM cada símbolo transporta 6 bits de información.",
    "256-QAM es más robusta frente al ruido que QPSK.",
    "A más puntos en la constelación, menor separación entre ellos y mayor SNR requerido."
  ],
  correct: [0, 1, 3],
  explanation: "QAM modula amplitud Y fase (combina ASK y PSK): cada símbolo es un punto en la constelación I/Q. 16-QAM = 4 bits, 64-QAM = 6 bits, 256-QAM = 8 bits por símbolo. El trade-off: más puntos → más bits por símbolo pero puntos más juntos → MÁS sensible al ruido (necesita mayor SNR). Por eso 256-QAM es MENOS robusta que QPSK, no más. Subí el ruido en el simulador y mirá cuándo empiezan los errores.",
  widget: "qam"
},
{
  id: 57, unit: 3, diff: "media", multi: false,
  q: "EJERCICIO: con PCM se digitaliza voz limitada a 4 kHz, muestreando según Nyquist y usando 8 bits por muestra. ¿Qué tasa de bits resulta?",
  options: [
    "32 kbps, porque se muestrea a 4000 muestras por segundo.",
    "64 kbps, porque fs = 2·4000 = 8000 muestras/s y 8000 × 8 bits = 64.000 bps.",
    "128 kbps, porque se muestrea a 16.000 muestras por segundo.",
    "8 kbps, porque cada muestra de 8 bits se envía mil veces por segundo."
  ],
  correct: [1],
  explanation: "Teorema de muestreo: fs ≥ 2·fmax = 2·4000 = 8000 muestras/s. Con 8 bits por muestra: 8000 × 8 = 64.000 bps = 64 kbps (canal DS0, la base de la telefonía digital). Etapas de PCM: muestreo → cuantización → codificación. Compromiso clave: más bits por muestra = menos ruido de cuantización pero más tasa de bits. El companding asigna más niveles a amplitudes pequeñas para mejorar la calidad percibida de la voz.",
  widget: "pcm"
},
{
  id: 58, unit: 3, diff: "media", multi: true,
  q: "La multiplexación... (elegí todas las respuestas correctas)",
  options: [
    "Se desarrolló para hacer un uso eficiente de las líneas de comunicación de alta velocidad.",
    "Solo puede utilizarse en medios de transmisión guiados.",
    "Está presente tanto en las tecnologías de cable módem como de ADSL.",
    "Puede implementarse por división de frecuencia o por división temporal."
  ],
  correct: [0, 2, 3],
  explanation: "Multiplexar es combinar múltiples señales en un único enlace de mayor capacidad, justamente para usar eficientemente enlaces caros o de alta velocidad. Se implementa por división de FRECUENCIA (FDM — y su versión óptica WDM), de TIEMPO (TDM/STDM) o combinaciones. El cable módem reparte canales de bajada/subida y el ADSL usa FDM sobre el par telefónico (voz abajo, datos arriba). Es FALSO que solo sirva en medios guiados: la radio, el satélite y la telefonía celular multiplexan en medios NO guiados (FDMA, TDMA)."
},
{
  id: 59, unit: 3, diff: "dificil", multi: true,
  q: "Sobre ADSL, DMT y duplexado, ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "ADSL es asimétrico (más bajada que subida) y usa FDM sobre el par telefónico, reservando la banda baja para voz.",
    "DMT divide el ancho de banda en muchos subcanales y asigna más bits a los de mejor SNR.",
    "TDD usa una sola banda de frecuencia alternando el tiempo entre subida y bajada.",
    "FDMA consiste en asignar ranuras de tiempo a cada estación del sistema."
  ],
  correct: [0, 1, 2],
  explanation: "ADSL usa el par telefónico existente con FDM: banda baja para voz POTS, bandas superiores para datos, con más capacidad de bajada que de subida. DMT (Discrete MultiTone) evalúa el SNR de cada subcanal: los buenos llevan más bits, los malos menos o se desactivan. TDD alterna subida/bajada en el tiempo sobre una banda única (FDD usa dos bandas separadas). FDMA asigna BANDAS DE FRECUENCIA; el que asigna ranuras de tiempo es TDMA."
},
{
  id: 60, unit: 3, diff: "media", multi: true,
  q: "Comparando TDM síncrono y STDM (estadístico), ¿cuáles afirmaciones son correctas? (seleccioná todas las correctas)",
  options: [
    "En TDM síncrono cada fuente tiene una ranura fija que se transmite aunque no tenga datos.",
    "STDM asigna ranuras dinámicamente solo a las fuentes con datos: más eficiente con ráfagas.",
    "STDM necesita agregar una dirección o identificador en cada ranura transmitida.",
    "STDM elimina la necesidad de buffers y nunca agrega retardo a los datos."
  ],
  correct: [0, 1, 2],
  explanation: "TDM síncrono: tramas con ranuras FIJAS por fuente → simple y de retardo predecible, pero desperdicia ranuras inactivas. STDM: asigna ranuras según demanda → eficiente con ráfagas; a cambio NECESITA buffers (que agregan retardo variable) y overhead de direccionamiento por ranura. Regla práctica: utilización mayor a ~80% dispara retardos y tamaño de buffers. Miralo en la animación.",
  widget: "mux"
}
];
