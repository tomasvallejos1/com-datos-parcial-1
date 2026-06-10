/* =====================================================================
   20 preguntas de desarrollo — Comunicación de Datos U1, U2, U3
   Corrección automática por detección de conceptos clave:
   - concepts: lista de conceptos que la respuesta debería mencionar.
     · label: nombre mostrado al usuario
     · keys: variantes de texto que cuentan como "concepto presente"
       (se comparan sin tildes y en minúsculas, sobre la respuesta normalizada)
   - model: respuesta modelo completa que se muestra tras corregir.
   Criterio: ≥60% de conceptos → Correcta · 35–59% → Parcial · <35% → Incorrecta
   ===================================================================== */

const DEV_QUESTIONS = [

{
  id: 1, unit: 1,
  q: "Explicá el modelo general de comunicación de datos (elementos y función de cada uno) y aplicalo al ejemplo de abrir una página web.",
  concepts: [
    { label: "Fuente (genera la información)", keys: ["fuente"] },
    { label: "Transmisor (convierte datos en señal)", keys: ["transmisor"] },
    { label: "Sistema/medio de transmisión", keys: ["sistema de transmision", "medio de transmision", "medio fisico", "canal"] },
    { label: "Receptor (reconstruye los datos)", keys: ["receptor"] },
    { label: "Destino (interpreta la información)", keys: ["destino"] },
    { label: "Ejemplo web: HTTP / navegador / servidor", keys: ["http", "navegador", "servidor", "pagina web", "web"] },
    { label: "Rol de capas/protocolos (TCP, IP, Ethernet/Wi-Fi)", keys: ["tcp", "capa", "ip ", "ethernet", "wifi", "wi-fi", "protocolo"] }
  ],
  model: "El modelo es: Fuente → Transmisor → Sistema de transmisión → Receptor → Destino.\n\n• FUENTE: genera la información (una computadora, un sensor, una persona escribiendo).\n• TRANSMISOR: transforma los datos en una señal adecuada al medio (placa de red, módem, antena Wi-Fi, láser de fibra).\n• SISTEMA DE TRANSMISIÓN: el camino físico (par trenzado, coaxial, fibra, radio, satélite).\n• RECEPTOR: toma la señal recibida (atenuada, distorsionada y con ruido) y reconstruye los datos.\n• DESTINO: interpreta la información (aplicación, usuario, servidor).\n\nAplicado a la web: el navegador (fuente) genera una solicitud HTTP/HTTPS; TCP divide y transporta los datos; IP direcciona los paquetes; la capa de acceso los encapsula en tramas Ethernet o Wi-Fi; la capa física los convierte en señales eléctricas, ópticas o de radio (transmisor + medio); los routers reenvían los paquetes; el servidor (destino) responde y el proceso inverso reconstruye la página en el navegador. En la práctica se busca que m' ≈ m: que la información llegue igual o suficientemente aproximada."
},
{
  id: 2, unit: 1,
  q: "Compará el modelo OSI con la arquitectura TCP/IP: cantidad de capas, función de cada una y equivalencias.",
  concepts: [
    { label: "OSI tiene 7 capas / modelo de referencia", keys: ["7 capas", "siete capas", "modelo de referencia"] },
    { label: "TCP/IP: 5 capas (física, acceso, internet, transporte, aplicación)", keys: ["5 capas", "cinco capas", "acceso a la red", "acceso a red"] },
    { label: "Capa física (bits/señales)", keys: ["fisica"] },
    { label: "Enlace de datos / acceso a red (tramas, MAC)", keys: ["enlace", "trama", "mac"] },
    { label: "Red / Internet (IP, enrutamiento)", keys: ["red", "internet", "enrutamiento", "ip"] },
    { label: "Transporte (TCP/UDP, extremo a extremo)", keys: ["transporte", "tcp", "udp", "extremo a extremo"] },
    { label: "Sesión / Presentación / Aplicación", keys: ["sesion", "presentacion", "aplicacion"] },
    { label: "TCP/IP es la arquitectura práctica real", keys: ["practica", "real", "se usa", "dominante", "internet usa"] }
  ],
  model: "OSI (Open Systems Interconnection) es un modelo de REFERENCIA de 7 capas: 1) Física (bits y señales por el medio), 2) Enlace de datos (tramas, MAC, acceso al medio, errores de trama), 3) Red (direccionamiento lógico y enrutamiento — IP), 4) Transporte (extremo a extremo entre procesos — TCP/UDP), 5) Sesión (diálogos y sesiones), 6) Presentación (formatos, cifrado, compresión) y 7) Aplicación (servicios de red: HTTP, DNS, SMTP).\n\nTCP/IP es la arquitectura PRÁCTICA de Internet, en 5 capas: Física, Acceso a la red, Internet, Transporte y Aplicación.\n\nEquivalencias: Aplicación+Presentación+Sesión de OSI ≈ Aplicación TCP/IP; Transporte ≈ Transporte; Red ≈ Internet; Enlace ≈ Acceso a red; Física ≈ Física.\n\nOSI es excelente para ordenar conceptos y diagnosticar; TCP/IP es lo que realmente se usa."
},
{
  id: 3, unit: 1,
  q: "Compará TCP y UDP: características de cada uno y ejemplos de cuándo conviene usar cada protocolo.",
  concepts: [
    { label: "TCP orientado a conexión (handshake)", keys: ["orientado a conexion", "handshake", "syn"] },
    { label: "TCP confiable (ACK, retransmisión)", keys: ["confiable", "ack", "retransmision", "retransmite", "confirmacion"] },
    { label: "TCP ordenado (números de secuencia)", keys: ["orden", "secuencia"] },
    { label: "Control de flujo y congestión en TCP", keys: ["control de flujo", "congestion", "ventana"] },
    { label: "UDP sin conexión / no garantiza entrega", keys: ["no orientado", "sin conexion", "no garantiza"] },
    { label: "UDP baja sobrecarga / simple / rápido", keys: ["sobrecarga", "simple", "rapido", "overhead", "latencia"] },
    { label: "Usos TCP: web, archivos, correo", keys: ["web", "archivo", "correo", "mail", "http"] },
    { label: "Usos UDP: DNS, streaming, VoIP, juegos", keys: ["dns", "streaming", "voip", "juego", "tiempo real", "video"] }
  ],
  model: "TCP (Transmission Control Protocol): orientado a conexión (three-way handshake SYN → SYN+ACK → ACK), entrega CONFIABLE (ACKs y retransmisiones por timeout), ORDENADA (números de secuencia que también evitan duplicados), con control de FLUJO (ventana anunciada por el receptor, para no saturarlo) y control de CONGESTIÓN (reduce la tasa si detecta pérdidas o demoras en la red). Mayor sobrecarga.\n\nUDP (User Datagram Protocol): NO orientado a conexión, no garantiza entrega, ni orden, ni ausencia de duplicados. Solo agrega puertos (y un checksum) sobre IP: mínima sobrecarga y baja latencia.\n\nCuándo usar cada uno: TCP cuando los datos deben llegar completos y en orden (web tradicional, transferencia de archivos, correo). UDP cuando importa la velocidad o la aplicación maneja las pérdidas (DNS, streaming, VoIP, videojuegos online, tiempo real). QUIC usa UDP como base y agrega confiabilidad y seguridad por encima."
},
{
  id: 4, unit: 1,
  q: "Explicá qué es el encapsulamiento y nombrá la PDU (unidad de datos) de cada capa al enviar datos de una aplicación por TCP/IP.",
  concepts: [
    { label: "Cada capa agrega su encabezado/información de control", keys: ["encabezado", "cabecera", "informacion de control", "header", "agrega"] },
    { label: "Segmento (TCP) / datagrama (UDP)", keys: ["segmento", "datagrama udp"] },
    { label: "Paquete / datagrama IP", keys: ["paquete", "datagrama ip", "datagrama"] },
    { label: "Trama (enlace, con trailer/FCS)", keys: ["trama", "fcs", "trailer"] },
    { label: "Bits / señales (capa física)", keys: ["bits", "senal", "señal", "fisica"] },
    { label: "Desencapsulamiento en recepción (proceso inverso)", keys: ["desencapsul", "inverso", "recepcion"] }
  ],
  model: "El encapsulamiento es el proceso por el cual CADA CAPA agrega su propia información de control (encabezado, y en el enlace también un trailer) a los datos que recibe de la capa superior.\n\nAl enviar datos web: Datos de aplicación → se agrega encabezado TCP → SEGMENTO TCP → se agrega encabezado IP → PAQUETE/DATAGRAMA IP → se agrega encabezado y trailer Ethernet/Wi-Fi (con FCS) → TRAMA → se convierte en BITS/SEÑALES en el medio físico.\n\nPDU por capa: Aplicación = mensaje/datos; Transporte = segmento TCP o datagrama UDP; Internet/Red = paquete o datagrama IP; Enlace = trama; Física = bits/símbolos/señales.\n\nEn recepción ocurre el proceso inverso (desencapsulamiento): cada capa quita y procesa su encabezado y entrega el contenido a la capa superior."
},
{
  id: 5, unit: 1,
  q: "Compará conmutación de circuitos y conmutación de paquetes: funcionamiento, ventajas, desventajas y ejemplos.",
  concepts: [
    { label: "Circuitos: ruta dedicada establecida antes de transmitir", keys: ["ruta dedicada", "camino dedicado", "reserva", "establece"] },
    { label: "Circuitos: retardo predecible / ancho de banda garantizado", keys: ["predecible", "garantiza", "reservado"] },
    { label: "Circuitos: ineficiente con tráfico variable / silencios", keys: ["ineficiente", "desperdicia", "silencio", "no transmite"] },
    { label: "Ejemplo circuitos: telefonía tradicional", keys: ["telefonia", "telefono"] },
    { label: "Paquetes: datos divididos en paquetes con direcciones", keys: ["paquetes", "divide", "direccion"] },
    { label: "Paquetes: uso eficiente del medio compartido / escalable", keys: ["eficiente", "compartido", "escalable"] },
    { label: "Paquetes: retardo variable, pérdidas, desorden", keys: ["retardo variable", "perdida", "fuera de orden", "desorden"] },
    { label: "Ejemplo paquetes: Internet", keys: ["internet"] }
  ],
  model: "CONMUTACIÓN DE CIRCUITOS: se establece una ruta dedicada ANTES de transmitir y queda reservada durante toda la comunicación (ej.: telefonía tradicional). Ventajas: retardo predecible, ancho de banda reservado, buena para voz constante. Desventajas: ineficiente si las partes no transmiten todo el tiempo (desperdicia recursos en silencios) y requiere el establecimiento previo.\n\nCONMUTACIÓN DE PAQUETES: los datos se dividen en paquetes que viajan por enlaces COMPARTIDOS; cada paquete lleva información de control (direcciones). Ventajas: uso eficiente del medio, buena para tráfico variable, escalable — es la base de Internet. Desventajas: retardo variable, posible pérdida de paquetes y llegada fuera de orden; requiere mecanismos de control en capas superiores (ej. TCP).\n\nATM fue un intermedio histórico: celdas de longitud fija y circuitos virtuales para combinar ventajas de ambos mundos."
},
{
  id: 6, unit: 1,
  q: "Definí los tres elementos clave de todo protocolo (sintaxis, semántica y temporización) con un ejemplo de cada uno, y diferenciá servicio, protocolo e interfaz.",
  concepts: [
    { label: "Sintaxis = formato de los datos (campos, cabeceras)", keys: ["sintaxis", "formato"] },
    { label: "Semántica = significado de campos y acciones", keys: ["semantica", "significado"] },
    { label: "Temporización = cuándo/velocidad/timeouts", keys: ["temporizacion", "cuando transmitir", "velocidad", "timeout", "temporizador", "tiempos"] },
    { label: "Ejemplos (SYN/ACK, cabecera IP, retransmisión...)", keys: ["syn", "ack", "ttl", "cabecera ip", "retransmision", "ejemplo"] },
    { label: "Servicio: lo que una capa ofrece a la superior", keys: ["servicio", "ofrece"] },
    { label: "Protocolo: reglas entre entidades pares", keys: ["pares", "par ", "misma capa"] },
    { label: "Interfaz: cómo una capa usa a la inferior (mismo sistema)", keys: ["interfaz", "inferior", "socket"] }
  ],
  model: "Todo protocolo define:\n\n• SINTAXIS: el formato de los datos — estructura de cabeceras, campos, longitudes, orden de bits, codificación. Ej.: la cabecera IP tiene campos de versión, TTL, protocolo, direcciones origen y destino.\n• SEMÁNTICA: el significado de cada campo y acción. Ej.: en TCP, SYN significa inicio de conexión, ACK confirma recepción, FIN inicia el cierre.\n• TEMPORIZACIÓN: cuándo transmitir, a qué velocidad, tiempos de espera y orden de eventos. Ej.: los temporizadores de retransmisión de TCP.\n\nAdemás, no confundir:\n• SERVICIO: lo que una capa OFRECE a la capa superior (ej.: transporte ofrece 'entrega confiable de bytes').\n• PROTOCOLO: las reglas que usan entidades PARES de la misma capa en sistemas distintos para comunicarse (ej.: TCP entre dos hosts).\n• INTERFAZ: cómo una capa accede a los servicios de la capa inferior dentro del MISMO sistema (ej.: una aplicación usa sockets para pedir transporte)."
},
{
  id: 7, unit: 2,
  q: "Explicá las tres alteraciones principales de la transmisión: atenuación (y distorsión de atenuación), distorsión de retardo y ruido. Incluí el concepto de ISI.",
  concepts: [
    { label: "Atenuación: pérdida de intensidad con la distancia", keys: ["atenuacion", "pierde", "perdida de intensidad", "distancia"] },
    { label: "Compensación: amplificadores/repetidores/ecualizadores", keys: ["amplificador", "repetidor", "regenerador", "ecualizador"] },
    { label: "Distorsión de atenuación: depende de la frecuencia", keys: ["frecuencias", "no todas las frecuencias", "distorsion de atenuacion"] },
    { label: "Distorsión de retardo: componentes llegan en tiempos distintos", keys: ["distorsion de retardo", "velocidades diferentes", "tiempos distintos", "retardo"] },
    { label: "ISI: un símbolo se derrama sobre el siguiente", keys: ["isi", "intersimbolica", "derrama", "ensancha"] },
    { label: "Ruido: señal no deseada que se suma", keys: ["ruido", "no deseada", "se suma"] },
    { label: "Señal debe ser detectable y mayor que el ruido", keys: ["mayor que el ruido", "detectada", "snr", "fuerte"] }
  ],
  model: "1) ATENUACIÓN: pérdida de intensidad de la señal con la distancia. Depende del medio, la frecuencia, conectores y empalmes. Para recibir bien, la señal debe ser suficientemente fuerte para ser detectada y suficientemente mayor que el ruido. Se compensa con amplificadores (analógico), repetidores/regeneradores (digital) y ecualizadores. La DISTORSIÓN DE ATENUACIÓN aparece porque no todas las frecuencias se atenúan igual: si se pierden las altas, los pulsos se redondean.\n\n2) DISTORSIÓN DE RETARDO: las distintas componentes de frecuencia viajan a velocidades diferentes y llegan en tiempos distintos (típico de medios guiados). Consecuencia principal: ISI (interferencia intersimbólica) — el pulso se ensancha y se 'derrama' sobre los símbolos vecinos, y el receptor no distingue dónde termina un bit y empieza el siguiente.\n\n3) RUIDO: toda señal no deseada que se suma a la útil. Tipos: térmico (agitación de electrones, siempre presente), intermodulación (no linealidades generan f1+f2 y f1−f2), diafonía/crosstalk (acoplamiento entre pares: NEXT y FEXT) e impulsivo (picos de alta amplitud y corta duración: motores, relés, descargas — muy dañino para datos digitales)."
},
{
  id: 8, unit: 2,
  q: "Describí los cuatro tipos de ruido (térmico, intermodulación, diafonía e impulsivo): causa de cada uno y cuál es el más dañino para datos digitales.",
  concepts: [
    { label: "Térmico: agitación de electrones, siempre presente", keys: ["termico", "agitacion", "electrones"] },
    { label: "Térmico se modela como ruido blanco", keys: ["blanco"] },
    { label: "Intermodulación: no linealidades mezclan frecuencias (f1±f2)", keys: ["intermodulacion", "no lineal", "f1", "suma y diferencia"] },
    { label: "Diafonía: una señal se induce en otro par (NEXT/FEXT)", keys: ["diafonia", "crosstalk", "induce", "next", "fext", "acopla"] },
    { label: "Impulsivo: picos de alta amplitud y corta duración", keys: ["impulsivo", "picos", "corta duracion", "rafaga"] },
    { label: "Fuentes impulsivo: motores, relés, descargas", keys: ["motor", "rele", "descarga", "electromagnetica"] },
    { label: "El impulsivo es el más dañino para datos digitales", keys: ["mas danino", "mas dañino", "corromper varios bits", "varios bits", "digital"] }
  ],
  model: "• RUIDO TÉRMICO: causado por la agitación térmica de los electrones. Está presente en TODOS los sistemas electrónicos y no se puede eliminar. Se modela como ruido blanco porque se distribuye uniformemente en un rango amplio de frecuencias.\n\n• RUIDO DE INTERMODULACIÓN: aparece cuando señales de distintas frecuencias comparten un medio NO perfectamente lineal: se generan componentes suma y diferencia (f1+f2, f1−f2) que caen sobre otros canales.\n\n• DIAFONÍA (crosstalk): la señal de un canal o par se induce en otro — pares cercanos en un UTP, cables mal organizados, conectores defectuosos. NEXT: medida en el extremo cercano al transmisor; FEXT: en el extremo lejano.\n\n• RUIDO IMPULSIVO: picos de ALTA amplitud y CORTA duración causados por motores, relés, descargas eléctricas e interferencia electromagnética. Es el MÁS DAÑINO para datos digitales: un solo pico breve puede corromper varios bits seguidos (en una señal analógica de voz apenas se nota un 'clic')."
},
{
  id: 9, unit: 2,
  q: "Explicá qué son el decibelio (dB) y el dBm, por qué se usan, y calculá el SNR de un enlace con señal de −60 dBm y ruido de −90 dBm interpretando el resultado.",
  concepts: [
    { label: "dB: unidad logarítmica que compara dos potencias", keys: ["logaritm", "relacion", "compara", "10 log"] },
    { label: "dB no es absoluto; dBm referencia 1 mW", keys: ["1 mw", "referencia", "absolut"] },
    { label: "Ventaja: multiplicaciones se vuelven sumas", keys: ["suma", "multiplicacion", "cascada", "ganancias"] },
    { label: "SNR = señal(dBm) − ruido(dBm)", keys: ["resta", "senal - ruido", "señal - ruido", "-60", "60 - "] },
    { label: "Resultado: 30 dB", keys: ["30 db", "30db", "= 30"] },
    { label: "30 dB = señal 1000 veces más potente", keys: ["1000", "mil veces"] },
    { label: "Mayor SNR permite modulaciones más densas / menos errores", keys: ["modulacion", "qam", "errores", "capacidad", "shannon"] }
  ],
  model: "El DECIBELIO (dB) es una unidad LOGARÍTMICA que expresa la relación entre dos potencias: dB = 10·log₁₀(P1/P2). No es una unidad absoluta: compara dos valores. Se usa porque en telecomunicaciones las potencias varían enormemente y porque las multiplicaciones de ganancias y pérdidas en cascada se transforman en SUMAS. Reglas: +3 dB duplica, +10 dB ×10, +20 dB ×100, +30 dB ×1000.\n\nEl dBm es potencia referida a 1 mW: dBm = 10·log₁₀(P/1mW). Así, 0 dBm = 1 mW, 30 dBm = 1 W; en Wi-Fi las potencias recibidas son negativas (menores a 1 mW). Relación: dBm = dBW + 30.\n\nSNR (Signal-to-Noise Ratio) compara señal útil contra ruido. Con ambas en dBm se resta: SNR = −60 − (−90) = 30 dB. En lineal: 10^(30/10) = 1000 → la señal es MIL veces más potente que el ruido. Un SNR alto permite menos errores y modulaciones más densas (64-QAM, 256-QAM), y según Shannon eleva la capacidad máxima del canal."
},
{
  id: 10, unit: 2,
  q: "Desarrollá los teoremas de Nyquist y Shannon: fórmula de cada uno, qué tipo de canal asume cada uno, qué responde cada uno y cómo se usan en conjunto.",
  concepts: [
    { label: "Nyquist: C = 2B·log₂(M)", keys: ["2b", "log2(m)", "log₂(m)", "2 b"] },
    { label: "Nyquist asume canal ideal SIN ruido", keys: ["sin ruido", "ideal"] },
    { label: "M = niveles de señal / bits por símbolo", keys: ["niveles", "simbolo"] },
    { label: "Shannon: C = B·log₂(1+SNR)", keys: ["1+snr", "1 + snr", "log2(1", "log₂(1"] },
    { label: "Shannon asume canal real CON ruido (SNR lineal)", keys: ["con ruido", "real", "snr"] },
    { label: "Shannon es el techo/límite teórico", keys: ["techo", "limite", "maximo teorico"] },
    { label: "No se puede aumentar M indefinidamente por el ruido", keys: ["indefinidamente", "confunde", "juntos", "no se puede aumentar"] },
    { label: "Uso conjunto: Shannon da el techo, Nyquist estima M necesario", keys: ["conjunto", "estimar", "acercarse", "cuantos niveles"] }
  ],
  model: "NYQUIST (canal IDEAL, sin ruido): C = 2B·log₂(M), donde B es el ancho de banda en Hz y M la cantidad de niveles de señal (log₂(M) = bits por símbolo). Dice que la tasa máxima de símbolos sin interferencia es 2B, y que con más niveles por símbolo se transportan más bits. Ej.: B = 3 kHz, M = 2 → C = 6000 bps; con M = 16 → 24.000 bps. Limitación: no considera ruido — en la realidad no se puede aumentar M indefinidamente porque los niveles quedan tan juntos que el ruido los confunde.\n\nSHANNON-HARTLEY (canal REAL, con ruido): C = B·log₂(1+SNR), con SNR en escala LINEAL (SNRlineal = 10^(SNRdB/10)). Da el TECHO teórico absoluto: ninguna técnica puede superarlo con errores arbitrariamente pequeños. Aumentar B sube la capacidad casi linealmente; aumentar SNR la sube logarítmicamente. Ej.: B = 3100 Hz, SNR = 30 dB (=1000) → C ≈ 31 kbps.\n\nUSO CONJUNTO: Shannon indica el límite realista del canal; Nyquist ayuda a estimar cuántos niveles/símbolos harían falta para acercarse a ese techo (en el ejemplo, M ≈ 32). La modulación real se elige según SNR, BER, ancho de banda y complejidad."
},
{
  id: 11, unit: 2,
  q: "Explicá la idea de Fourier aplicada a señales, y definí espectro, ancho de banda (absoluto y efectivo) y componente DC. ¿Por qué un canal con poco ancho de banda deforma una señal cuadrada?",
  concepts: [
    { label: "Toda señal periódica = suma de senoidales (armónicos)", keys: ["suma de sen", "senoidal", "armonico", "fourier"] },
    { label: "Fundamental y armónicos múltiplos", keys: ["fundamental", "multiplo"] },
    { label: "Espectro: conjunto de frecuencias de la señal", keys: ["espectro", "conjunto de frecuencias"] },
    { label: "Ancho de banda absoluto: fmax − fmin", keys: ["fmax", "absoluto", "diferencia"] },
    { label: "Ancho de banda efectivo: donde se concentra la energía", keys: ["efectivo", "concentra", "mayor parte"] },
    { label: "DC: frecuencia cero / valor promedio", keys: ["dc", "frecuencia cero", "promedio", "continua"] },
    { label: "Cuadrada deformada: pierde armónicos altos, se redondea", keys: ["redondea", "esquinas", "pierde", "altas frecuencias", "deforma"] }
  ],
  model: "FOURIER demostró que toda señal periódica puede representarse como una SUMA de senos y cosenos de distintas frecuencias: la frecuencia FUNDAMENTAL más sus ARMÓNICOS (frecuencias múltiplo). Cuantos más armónicos se incluyen, más fiel es la reconstrucción. La transformada de Fourier extiende esta idea a señales no periódicas y responde cuánta energía de cada frecuencia hay en la señal (permite pasar del dominio del tiempo al de la frecuencia).\n\n• ESPECTRO: el conjunto de frecuencias que componen una señal.\n• ANCHO DE BANDA ABSOLUTO: B = fmax − fmin (frecuencia máxima menos mínima presentes).\n• ANCHO DE BANDA EFECTIVO: el rango donde se concentra la MAYOR PARTE de la energía — es con el que se trabaja en la práctica.\n• COMPONENTE DC: la componente de frecuencia CERO, es decir el valor promedio de la señal. Muchos medios (transformadores, acoples capacitivos) no la transmiten bien.\n\nUna señal cuadrada tiene transiciones abruptas que dependen de los armónicos de ALTA frecuencia. Si el canal tiene poco ancho de banda, filtra esos armónicos y las 'esquinas' se redondean: el pulso se deforma. Por eso, a mayor velocidad de datos (bits más cortos, señal que cambia más rápido) se necesita mayor ancho de banda."
},
{
  id: 12, unit: 2,
  q: "Compará transmisión analógica y digital: cómo combate cada una la atenuación (amplificador vs. repetidor) y cuáles son las ventajas de la transmisión digital.",
  concepts: [
    { label: "Analógica usa amplificadores", keys: ["amplificador"] },
    { label: "El amplificador también amplifica el ruido (se acumula)", keys: ["amplifica el ruido", "tambien el ruido", "acumula"] },
    { label: "Digital usa repetidores/regeneradores que reconstruyen bits", keys: ["repetidor", "regenera", "reconstruye"] },
    { label: "Señal regenerada limpia, sin ruido acumulado", keys: ["limpia", "nueva", "sin ruido"] },
    { label: "Ventaja: detección/corrección de errores", keys: ["deteccion", "correccion", "errores"] },
    { label: "Ventaja: multiplexación / integración voz-datos-video", keys: ["multiplexacion", "integracion", "voz, datos", "voz datos"] },
    { label: "Ventaja: cifrado/compresión/procesamiento digital", keys: ["cifrado", "compresion", "procesamiento"] },
    { label: "Desventaja digital: más ancho de banda / sincronización", keys: ["mas ancho de banda", "sincronizacion", "desventaja"] }
  ],
  model: "TRANSMISIÓN ANALÓGICA: transporta señales analógicas; cuando la señal se debilita se usan AMPLIFICADORES. El problema: el amplificador eleva la potencia de TODO lo que recibe, ruido incluido — el ruido se acumula etapa tras etapa y degrada la calidad de forma irreversible.\n\nTRANSMISIÓN DIGITAL: si la señal se degrada, un REPETIDOR/REGENERADOR decide qué bits llegaron y genera una señal NUEVA y limpia: el ruido no se acumula entre tramos.\n\nVentajas de la transmisión digital: menor susceptibilidad al ruido acumulado; posibilidad de DETECCIÓN y CORRECCIÓN de errores; facilidad de MULTIPLEXACIÓN; compatibilidad con procesamiento digital; cifrado y compresión más simples; integración de voz, datos y video en una misma red.\n\nDesventajas: puede requerir más ancho de banda (ej., voz digitalizada) y depende de una sincronización y codificación adecuadas."
},
{
  id: 13, unit: 3,
  q: "Compará par trenzado, cable coaxial y fibra óptica: construcción, ventajas, desventajas y usos típicos de cada medio guiado.",
  concepts: [
    { label: "Par trenzado: conductores trenzados para reducir diafonía", keys: ["trenzado", "torsion", "diafonia"] },
    { label: "Par: barato y fácil; vulnerable a ruido/atenuación", keys: ["barato", "economico", "vulnerable"] },
    { label: "Par: usos LAN/telefonía/cableado estructurado; UTP/STP", keys: ["lan", "telefonia", "utp", "stp", "estructurado", "ethernet"] },
    { label: "Coaxial: conductor central, dieléctrico, blindaje", keys: ["conductor central", "dielectrico", "blindaje", "malla"] },
    { label: "Coaxial: mejor blindaje/ancho de banda; usos CATV/RF", keys: ["catv", "television", "rf", "antena", "mejor blindaje"] },
    { label: "Fibra: núcleo/revestimiento, reflexión interna total", keys: ["nucleo", "revestimiento", "cladding", "reflexion interna", "luz"] },
    { label: "Fibra: enorme ancho de banda, baja atenuación, inmune a EMI", keys: ["inmune", "emi", "baja atenuacion", "enorme ancho", "gran ancho"] },
    { label: "Fibra: usos backbone/FTTH/larga distancia; más cara de instalar", keys: ["backbone", "ftth", "larga distancia", "datacenter", "empalme", "cara", "costos"] }
  ],
  model: "PAR TRENZADO: dos conductores de cobre aislados y trenzados en espiral; la torsión hace que las interferencias afecten a ambos por igual y se cancelen en recepción diferencial (menos EMI y diafonía). Es barato, flexible y el más usado (telefonía, Ethernet/LAN, cableado estructurado, PoE), pero es el más vulnerable a ruido y atenuación. Variantes: UTP (sin blindaje) y STP/FTP/S-FTP (con pantallas o mallas; mejor inmunidad pero más caro y exige puesta a tierra). Categorías: 5e (100 MHz, 1 GbE), 6 (250 MHz), 6A (500 MHz, 10 GbE a 100 m), 7, 8.\n\nCOAXIAL: conductor central + dieléctrico + blindaje externo + cubierta. Su geometría da mejor blindaje y mejor comportamiento en alta frecuencia que el par trenzado. Usos: TV por cable (CATV/HFC), RF, antenas, redes antiguas. Más rígido y menos práctico para LAN moderna.\n\nFIBRA ÓPTICA: transmite LUZ por un núcleo de vidrio, guiada por reflexión interna total (diferencia de índice de refracción núcleo/revestimiento). Ventajas: altísimo ancho de banda, baja atenuación (largas distancias), inmunidad total a EMI, baja tasa de error, difícil de interceptar. Desventajas: empalmes/conectores delicados, equipos ópticos caros, instalación especializada. Usos: backbone, FTTH, larga distancia, datacenters, WDM."
},
{
  id: 14, unit: 3,
  q: "Explicá la diferencia entre fibra multimodo y monomodo (incluí dispersión modal) y mencioná las ventanas ópticas de trabajo.",
  concepts: [
    { label: "Multimodo: múltiples trayectorias de luz en el núcleo", keys: ["multiples", "varios modos", "trayectorias", "multimodo"] },
    { label: "Dispersión modal: rayos llegan en tiempos distintos", keys: ["dispersion modal", "tiempos distintos", "ensancha"] },
    { label: "Multimodo: emisores baratos (LED), distancias cortas/medias", keys: ["led", "barato", "cortas", "economico"] },
    { label: "Monomodo: núcleo muy pequeño, un solo modo", keys: ["monomodo", "nucleo pequeno", "nucleo muy pequeno", "un modo", "un solo modo"] },
    { label: "Monomodo: más distancia y ancho de banda; requiere láser", keys: ["laser", "mayor distancia", "mas distancia", "mayor ancho"] },
    { label: "Ventanas: 850, 1310 y 1550 nm", keys: ["850", "1310", "1550", "ventana"] },
    { label: "1550 nm: menor atenuación, larga distancia y WDM", keys: ["menor atenuacion", "wdm", "larga distancia"] }
  ],
  model: "FIBRA MULTIMODO: el núcleo (más grande) permite MÚLTIPLES trayectorias o modos de luz. Tipos: índice escalonado e índice gradual. Su limitación es la DISPERSIÓN MODAL: los rayos recorren caminos de distinta longitud y llegan en tiempos distintos, el pulso se ensancha y eso limita distancia y velocidad. A favor: emisores más económicos (LEDs/VCSEL), útil en distancias cortas y medias (LANs, datacenters).\n\nFIBRA MONOMODO: núcleo MUY pequeño que permite esencialmente UN solo modo de propagación: sin dispersión modal → mayor distancia y mayor ancho de banda. A cambio requiere láseres y alineación más precisa, con electrónica óptica más costosa. Es la elegida para larga distancia y backbones.\n\nVENTANAS ÓPTICAS (regiones infrarrojas donde trabaja la fibra): 850 nm, 1310 nm y 1550 nm. La atenuación es menor cerca de 1550 nm, por eso esa ventana domina en larga distancia y en sistemas WDM/DWDM."
},
{
  id: 15, unit: 3,
  q: "¿Qué es el cableado estructurado y qué busca? Nombrá sus elementos (espacios, pasivos, activos, distribuidores) y las normas principales que lo rigen.",
  concepts: [
    { label: "Infraestructura organizada/jerárquica/estandarizada", keys: ["organizada", "jerarquica", "estandarizada", "estructurado"] },
    { label: "Objetivos: flexibilidad, escalabilidad, mantenimiento, documentación", keys: ["flexibilidad", "escalab", "mantenimiento", "documentacion", "crecimiento"] },
    { label: "Espacios: acometida, cuarto de telecomunicaciones/equipos, áreas de trabajo", keys: ["acometida", "cuarto", "area de trabajo", "areas de trabajo"] },
    { label: "Pasivos: cables, rosetas/TO, patch panels, racks, canalizaciones", keys: ["patch panel", "roseta", "rack", "canalizacion", "pasivo"] },
    { label: "Activos: switches, routers, APs, firewalls", keys: ["switch", "router", "access point", "firewall", "activo"] },
    { label: "Distribuidores CD/BD/FD (campus/edificio/piso)", keys: ["campus distributor", "building", "floor", "distribuidor", "cd", "bd", "fd"] },
    { label: "Normas: TIA-568/569/606/607/942", keys: ["568", "569", "606", "607", "942", "tia"] },
    { label: "ISO/IEC 11801 (e IRAM en Argentina); IEEE 802.3", keys: ["11801", "iso", "iram", "802.3", "ieee"] }
  ],
  model: "El CABLEADO ESTRUCTURADO es una infraestructura organizada, jerárquica y ESTANDARIZADA para transportar voz, datos y video en edificios o campus. Busca evitar instalaciones improvisadas y lograr flexibilidad, escalabilidad, mantenimiento, documentación, crecimiento ordenado e interoperabilidad.\n\nELEMENTOS:\n• Espacios: acometida de red, cuarto de telecomunicaciones, cuarto de equipamiento, áreas de trabajo.\n• Pasivos: cables, rosetas/TO (Telecommunications Outlets), patch panels, racks, bandejas, canalizaciones, conectores.\n• Activos: switches, routers, access points, firewalls, servidores, conversores de medio.\n• Distribuidores: CD (Campus Distributor), BD (Building Distributor), FD (Floor Distributor).\n\nNORMAS: ISO/IEC 11801 (cableado genérico internacional; IRAM-ISO/IEC 11801 en Argentina); ANSI/TIA-568 (cableado en edificios comerciales: requisitos, par trenzado, fibra, coaxial); TIA-569 (espacios y recorridos); TIA-606 (administración, etiquetado y documentación); TIA-607 (puesta a tierra y equipotencialidad); TIA-942 (datacenters); EN 50173/50174/50310 (Europa); IEEE 802.3 (Ethernet: 100BASE-TX, 1000BASE-T, 10GBASE-T...). También T568A/T568B: esquemas de terminación del conector 8P8C/RJ-45 (misma norma ambos extremos = cable directo; distinta = cruzado)."
},
{
  id: 16, unit: 3,
  q: "Compará microondas terrestres y satelitales (componentes del enlace satelital y satélite GEO incluidos), y explicá línea de vista, zona de Fresnel y pérdida en espacio libre.",
  concepts: [
    { label: "Microondas terrestres: punto a punto, direccionales, línea de vista", keys: ["punto a punto", "direccional", "linea de vista"] },
    { label: "Lluvia afecta frecuencias altas (>10 GHz)", keys: ["lluvia", "10 ghz", "clima"] },
    { label: "Satélite: repetidor con uplink, transpondedor y downlink", keys: ["uplink", "downlink", "transpondedor", "ascendente", "descendente", "repetidor"] },
    { label: "GEO: ~35.786 km, parece fijo; gran cobertura", keys: ["35786", "35.786", "geoestacionario", "fijo", "cobertura"] },
    { label: "GEO: retardo alto y grandes pérdidas", keys: ["retardo", "latencia", "perdidas"] },
    { label: "Fresnel: elipsoide alrededor del camino; despejar ~60%", keys: ["fresnel", "60", "elipso"] },
    { label: "FSPL crece con distancia y frecuencia (+6 dB al duplicar)", keys: ["fspl", "espacio libre", "6 db", "20 log", "duplicar"] },
    { label: "Multitrayectoria/difracción si hay obstrucciones", keys: ["multitrayectoria", "difraccion", "reflexion", "desvanecimiento"] }
  ],
  model: "MICROONDAS TERRESTRES (2–40 GHz): enlaces DIRECCIONALES punto a punto con antenas parabólicas; requieren LÍNEA DE VISTA y alineación. Ventajas: despliegue rápido frente a tender fibra, buena capacidad a distancias moderadas. Desventajas: sensibles a obstáculos e interferencia; la atenuación por LLUVIA crece a frecuencias altas (especialmente >10 GHz); requieren regulación de frecuencias.\n\nMICROONDAS SATELITALES: el satélite actúa como estación REPETIDORA: recibe por el enlace ascendente (UPLINK), el TRANSPONDEDOR amplifica/procesa y retransmite por el descendente (DOWNLINK) hacia las estaciones terrenas. El satélite GEOESTACIONARIO orbita a ~35.786 km y parece fijo respecto de la Tierra: gran cobertura y antenas fijas, pero RETARDO alto y pérdidas de espacio libre elevadas.\n\nLÍNEA DE VISTA Y FRESNEL: no alcanza con que las antenas 'se vean'; debe estar despejada la ZONA DE FRESNEL, una región elipsoidal alrededor del camino directo (regla práctica: liberar al menos el 60% de la primera zona). Obstrucciones causan difracción, pérdidas y multitrayectoria (desvanecimiento, ISI; se mitiga con OFDM, diversidad y MIMO).\n\nPÉRDIDA EN ESPACIO LIBRE: FSPL(dB) = 32,44 + 20·log₁₀(d_km) + 20·log₁₀(f_MHz). Duplicar la distancia o la frecuencia agrega ~6 dB de pérdida."
},
{
  id: 17, unit: 3,
  q: "Compará los códigos de línea NRZ-L, NRZI, AMI y Manchester: cómo codifica cada uno, componente DC, sincronización y ancho de banda.",
  concepts: [
    { label: "NRZ-L: dos niveles, el nivel se mantiene todo el bit", keys: ["nrz-l", "nrz l", "dos niveles", "nivel se mantiene"] },
    { label: "NRZ: problema de DC y sincronización con bits iguales", keys: ["dc", "sincronizacion", "cadenas", "seguidos", "iguales"] },
    { label: "NRZI: codifica por transición (1) o ausencia (0) — diferencial", keys: ["nrzi", "transicion", "diferencial"] },
    { label: "NRZI: falla con cadenas largas de ceros", keys: ["ceros"] },
    { label: "AMI: tres niveles, unos alternan polaridad, sin DC", keys: ["ami", "alterna", "tres niveles", "bipolar"] },
    { label: "AMI detecta errores por violación de alternancia", keys: ["violacion", "detecta errores", "deteccion"] },
    { label: "Manchester: transición en mitad del bit (dato + reloj)", keys: ["manchester", "mitad", "medio del bit", "reloj"] },
    { label: "Manchester: sin DC pero hasta doble ancho de banda/baudios", keys: ["doble", "mas ancho de banda", "baudios"] }
  ],
  model: "NRZ-L (Non Return to Zero-Level): dos niveles de voltaje, uno para 0 y otro para 1; el nivel se mantiene durante TODO el bit. Simple y eficiente en ancho de banda, pero con largas cadenas de bits iguales genera componente DC y el receptor pierde sincronización (no hay transiciones).\n\nNRZI (NRZ Inverted): codificación DIFERENCIAL — 1 = hay transición al inicio del intervalo, 0 = no hay. Robusto ante inversión de polaridad, pero las cadenas largas de CEROS siguen sin generar transiciones.\n\nAMI (Alternate Mark Inversion): TRES niveles — 0 = ausencia de señal; 1 = pulsos que ALTERNAN polaridad (+,−,+,−...). Sin componente DC neta (el promedio tiende a cero), los unos consecutivos mantienen transiciones y una VIOLACIÓN de la alternancia delata un error. Problema: cadenas largas de ceros sin transiciones (lo resuelven B8ZS/HDB3 con scrambling).\n\nMANCHESTER (bifase): SIEMPRE hay una transición en el MEDIO de cada bit, que es dato y reloj a la vez (bajo→alto = 1, alto→bajo = 0, según convención). Sincronización incorporada y sin DC, pero requiere hasta el DOBLE de tasa de señalización: para 1 Mbps, NRZ usa 1 Mbaudio y Manchester 2 Mbaudios. El Manchester DIFERENCIAL usa la transición central solo como reloj y codifica el dato con la presencia/ausencia de transición al inicio (usado en Token Ring)."
},
{
  id: 18, unit: 3,
  q: "Explicá el scrambling y desarrollá B8ZS y HDB3: qué problema resuelven, cómo funcionan las sustituciones y por qué el receptor no las confunde con errores.",
  concepts: [
    { label: "Problema: largas cadenas de ceros en AMI sin transiciones", keys: ["ceros", "sin transiciones", "sincronizacion", "ami"] },
    { label: "Objetivos: sincronización, sin DC, sin reducir velocidad", keys: ["sin reducir", "velocidad", "dc", "balance"] },
    { label: "B8ZS sustituye 8 ceros", keys: ["b8zs", "ocho ceros", "8 ceros"] },
    { label: "Patrón con violaciones según polaridad del último pulso (000+−0−+)", keys: ["000+-0-+", "000-+0+-", "ultimo pulso", "polaridad"] },
    { label: "HDB3 evita más de 3 ceros (sustituye cada 4)", keys: ["hdb3", "cuatro ceros", "4 ceros", "tres ceros"] },
    { label: "Patrones 000V / B00V (V=violación, B=balance)", keys: ["000v", "b00v", "violacion", "balance"] },
    { label: "El receptor reconoce la violación como sustitución y reconstruye", keys: ["reconoce", "reconozca", "reconstruye", "reconstruya", "restaura", "no como error", "deshace"] },
    { label: "Uso: E-carrier (HDB3) / T-carrier (B8ZS)", keys: ["e-carrier", "europeo", "t-carrier", "e1", "t1"] }
  ],
  model: "El SCRAMBLING (aleatorización) reemplaza patrones problemáticos —largas secuencias sin transiciones, típicamente CEROS en AMI— por patrones reconocibles, buscando: mantener la sincronización del receptor, evitar componente DC, NO reducir la velocidad de datos y conservar la capacidad de detectar errores.\n\nB8ZS (Bipolar with 8-Zero Substitution): reemplaza cada cadena de OCHO ceros por un patrón con violaciones bipolares INTENCIONALES. Si el último pulso fue positivo: 000+−0−+ ; si fue negativo: 000−+0+− . Las violaciones (dos pulsos seguidos de igual polaridad) están ubicadas de forma que el receptor las reconozca como SUSTITUCIÓN —no como error— y reconstruya los ocho ceros originales. Se usa en sistemas T-carrier norteamericanos.\n\nHDB3 (High Density Bipolar 3 zeros): evita más de TRES ceros consecutivos sustituyendo cada grupo de cuatro por 000V o B00V, según la polaridad y la paridad de pulsos desde la última sustitución (V = pulso en violación; B = pulso de balance que mantiene el promedio DC en cero). Se usa en los sistemas europeos E-carrier.\n\nEn ambos, la clave es la misma: la violación bipolar es una 'firma' acordada — el receptor la detecta, sabe que hubo sustitución y restaura los ceros, manteniendo sincronización y balance DC."
},
{
  id: 19, unit: 3,
  q: "Compará las técnicas de modulación digital ASK, FSK, PSK y QAM: qué parámetro varía cada una, robustez, eficiencia y relación entre bits por símbolo y SNR requerido.",
  concepts: [
    { label: "ASK varía la amplitud", keys: ["ask", "amplitud"] },
    { label: "ASK simple pero sensible al ruido de amplitud", keys: ["sensible", "ruido de amplitud", "simple"] },
    { label: "FSK varía la frecuencia; robusta pero gasta ancho de banda", keys: ["fsk", "frecuencia"] },
    { label: "PSK varía la fase (BPSK 180°, QPSK 4 fases = 2 bits)", keys: ["psk", "fase", "qpsk", "bpsk"] },
    { label: "QAM combina amplitud y fase (constelación I/Q)", keys: ["qam", "amplitud y fase", "constelacion"] },
    { label: "Bits por símbolo: 16-QAM=4, 64-QAM=6, 256-QAM=8", keys: ["bits por simbolo", "4 bits", "6 bits", "8 bits", "log2"] },
    { label: "Más puntos → puntos más juntos → más SNR requerido", keys: ["mas snr", "mayor snr", "juntos", "cerca"] },
    { label: "bps = baudios × bits/símbolo", keys: ["baudio", "bps ="] }
  ],
  model: "Cuando datos digitales deben viajar por un medio analógico, se modula una PORTADORA variando alguno de sus parámetros:\n\n• ASK (Amplitude Shift Keying): varía la AMPLITUD (ej.: 1 = portadora presente, 0 = apagada). Simple (se usa en sistemas ópticos y RF sencillos) pero MUY sensible al ruido de amplitud y a variaciones de ganancia.\n\n• FSK (Frequency Shift Keying): varía la FRECUENCIA (1 = f1, 0 = f2). Más robusta que ASK frente a ruido de amplitud, pero requiere más ancho de banda y su eficiencia espectral es limitada. MFSK usa M frecuencias (M = 2^L → L bits por símbolo).\n\n• PSK (Phase Shift Keying): varía la FASE. BPSK: 2 fases a 180°, 1 bit/símbolo. QPSK: 4 fases a 90°, 2 bits/símbolo (a 9600 bps → 4800 baudios). DPSK codifica por CAMBIO de fase respecto del símbolo anterior. Eficiente y robusta, requiere sincronización de fase.\n\n• QAM (Quadrature Amplitude Modulation): combina AMPLITUD y FASE; los símbolos son puntos de una constelación I/Q. 16-QAM = 4 bits, 64-QAM = 6, 256-QAM = 8, 1024-QAM = 10 bits/símbolo. Máxima eficiencia espectral.\n\nTRADE-OFF clave: bps = baudios × bits/símbolo. A más bits por símbolo, los puntos de la constelación quedan MÁS JUNTOS y el mismo ruido causa más errores: las modulaciones densas exigen mayor SNR (Eb/N0) para la misma BER. Por eso un enlace elige la modulación según su SNR (ej.: Wi-Fi baja de 256-QAM a QPSK cuando la señal empeora)."
},
{
  id: 20, unit: 3,
  q: "Explicá FDM, WDM, TDM síncrono y STDM: cómo divide el medio cada técnica, ejemplos de uso, y por qué STDM puede ser más eficiente que TDM síncrono.",
  concepts: [
    { label: "Multiplexar: combinar varios flujos en un enlace de mayor capacidad", keys: ["combinar", "comparten", "un unico enlace", "mux"] },
    { label: "FDM: cada señal en una banda de frecuencia distinta", keys: ["fdm", "banda de frecuencia", "frecuencia diferente", "frecuencia distinta"] },
    { label: "FDM: bandas de guarda; usos radio/TV/ADSL", keys: ["guarda", "radio", "tv", "adsl"] },
    { label: "WDM: longitudes de onda en fibra (DWDM denso)", keys: ["wdm", "longitud de onda", "longitudes de onda", "dwdm", "colores"] },
    { label: "TDM síncrono: ranuras de tiempo FIJAS por fuente", keys: ["tdm", "ranura", "tiempo", "fija", "turno"] },
    { label: "TDM desperdicia ranuras si la fuente está inactiva", keys: ["desperdicia", "inactiva", "vacia", "aunque no"] },
    { label: "STDM: ranuras dinámicas según demanda + identificador", keys: ["stdm", "estadistico", "dinamica", "demanda", "identificador", "direccion"] },
    { label: "STDM eficiente con ráfagas; requiere buffers / cuidado con utilización alta", keys: ["rafaga", "buffer", "retardo", "80%", "utilizacion"] }
  ],
  model: "MULTIPLEXAR es combinar múltiples señales o flujos en un único enlace de mayor capacidad (n entradas → MUX → enlace → DEMUX → n salidas), para usar eficientemente enlaces caros.\n\n• FDM (Frequency Division Multiplexing): cada señal ocupa una BANDA DE FRECUENCIA distinta del mismo medio, con BANDAS DE GUARDA para evitar solapamiento. Usos: radio, TV, cable, ADSL (banda baja para voz POTS, superiores para datos). Problemas: diafonía e intermodulación si hay no linealidades.\n\n• WDM (Wavelength Division Multiplexing): el FDM de la FIBRA — varios láseres con distintas longitudes de onda ('colores') comparten una fibra. DWDM usa canales muy próximos: capacidad enorme sin tender nuevas fibras (backbones, enlaces submarinos).\n\n• TDM SÍNCRONO: el tiempo se divide en tramas con RANURAS FIJAS asignadas a cada fuente; la ranura se transmite AUNQUE la fuente no tenga datos. Simple y de retardo predecible (telefonía digital: DS-1 = 24 canales × 64 kbps = 1,544 Mbps; SONET/SDH en fibra), pero desperdicia ranuras inactivas.\n\n• STDM (TDM ESTADÍSTICO): asigna ranuras DINÁMICAMENTE solo a las fuentes con datos, agregando un identificador/dirección por ranura. Es más eficiente cuando las fuentes transmiten por RÁFAGAS (típico en datos): permite que la velocidad del enlace agregado sea menor que la suma de los picos de entrada. Costos: necesita BUFFERS (retardo variable), overhead de direccionamiento, y con utilización alta (>~80%) el retardo y los buffers crecen rápidamente."
}
];
