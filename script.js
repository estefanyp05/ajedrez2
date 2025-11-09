// script.js

// --- 1. Elementos del DOM ---
const welcomePage = document.getElementById('welcome-page');
const enterSiteButton = document.getElementById('enter-site-button');
const mainDashboard = document.getElementById('main-dashboard');
const gamePage = document.getElementById('game-page');

// Dashboard Elements
const navButtons = document.querySelectorAll('.main-nav .nav-button');
const dashboardSections = document.querySelectorAll('.dashboard-section');
const currentUserDisplay = document.getElementById('current-user-display');
const logoutButton = document.getElementById('logout-button');
const playPartnerButton = document.getElementById('play-partner-button');

// User Profile
const profilePic = document.getElementById('profile-pic');
const uploadProfilePicInput = document.getElementById('upload-profile-pic');
const editPicButton = document.querySelector('.edit-pic-button');
const profileUsernameInput = document.getElementById('profile-username');
const editUsernameButton = document.getElementById('edit-username-button');
const saveUsernameButton = document.getElementById('save-username-button');
const currentPartnerDisplay = document.getElementById('current-partner-display');

// Add Partner
const partnerUsernameInput = document.getElementById('partner-username-input');
const sendPartnerRequestButton = document.getElementById('send-partner-request-button');
const partnerRequestMessage = document.getElementById('partner-request-message');
const incomingRequestsList = document.getElementById('incoming-requests-list');

// Game Review
const partnerForReview = document.getElementById('partner-for-review');
const playedGamesList = document.getElementById('played-games-list');
const gameReviewDetails = document.getElementById('game-review-details');
const currentReviewGameId = document.getElementById('current-review-game-id');
const reviewBoardContainer = document.getElementById('review-board-container');
const prevMoveButton = document.getElementById('prev-move-button');
const nextMoveButton = document.getElementById('next-move-button');
const currentMoveInfo = document.getElementById('current-move-info');
const gameAnalysisOutput = document.getElementById('game-analysis-output');
const statsUser1 = document.getElementById('stats-user1');
const statsUser2 = document.getElementById('stats-user2');
const winsUser1 = document.getElementById('wins-user1');
const winsUser2 = document.getElementById('wins-user2');

// Game Page
const gameTitle = document.getElementById('game-title');
const gameSubtitle = document.getElementById('game-subtitle');
const timeButtons = document.querySelectorAll('.time-button');
const startGameButton = document.getElementById('start-game-button');
const player1Name = document.getElementById('player1-name');
const player1Timer = document.getElementById('player1-timer');
const player2Name = document.getElementById('player2-name');
const player2Timer = document.getElementById('player2-timer');
const chessboardLiveContainer = document.getElementById('chessboard-live-container');
const chatMessages = document.getElementById('chat-messages');
const chatTextInput = document.getElementById('chat-text-input');
const sendChatButton = document.getElementById('send-chat-button');
const voiceChatButton = document.getElementById('voice-chat-button');
const callButton = document.getElementById('call-button');
const callStatus = document.getElementById('call-status');

// --- 2. Variables de Estado (Simuladas, idealmente vendrían del backend) ---
let currentUser = null; // null si no ha iniciado sesión
let currentPartner = null; // null si no tiene pareja agregada
let selectedGameTime = null;
let currentActiveGame = null; // Objeto de la partida actual en juego
let currentReviewingGame = null; // Objeto de la partida que se está revisando

// --- 3. Funciones de Manejo de Vistas ---

// Función para cambiar entre secciones principales (Bienvenida, Dashboard, Juego)
function showPage(pageId) {
    const pages = [welcomePage, mainDashboard, gamePage];
    pages.forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

// Función para cambiar entre secciones del Dashboard
function showDashboardSection(sectionId) {
    dashboardSections.forEach(section => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    navButtons.forEach(button => {
        if (button.dataset.section === sectionId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// --- 4. Event Listeners ---

// Botón de la página de bienvenida
enterSiteButton.addEventListener('click', () => {
    showPage('main-dashboard');
    // Si no hay usuario logueado, mostrar el login. Para este ejemplo, asumimos login automático.
    // Esto se reemplazaría por un modal de login real o una página de login.
    simulateLogin('Invitado'); // Para que no esté vacío inicialmente
});

// Navegación del Dashboard
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        showDashboardSection(button.dataset.section);
    });
});

// Botón de "Jugar con mi pareja"
playPartnerButton.addEventListener('click', () => {
    if (currentPartner) {
        showPage('game-page');
        setupNewGame(); // Función para preparar la nueva partida
    } else {
        alert('Primero debes agregar una pareja para jugar.');
        showDashboardSection('add-partner');
    }
});

// Simulación de Login/Logout (Backend necesario para un sistema real)
function simulateLogin(username) {
    currentUser = { id: 'user123', username: username }; // Datos de usuario simulados
    currentUserDisplay.textContent = currentUser.username;
    logoutButton.classList.remove('hidden');
    // Cargar perfil y datos si existen
    loadUserProfile();
    loadPartnerInfo();
    loadGameHistory();
    showDashboardSection('user-profile'); // Mostrar perfil por defecto
}

logoutButton.addEventListener('click', () => {
    currentUser = null;
    currentPartner = null;
    currentUserDisplay.textContent = 'Invitado';
    logoutButton.classList.add('hidden');
    // Limpiar toda la UI del dashboard
    showPage('welcome-page'); // Regresar a la bienvenida o a una pantalla de login
});

// --- 5. Lógica del Perfil de Usuario ---
function loadUserProfile() {
    // ESTO REQUIERE BACKEND: Cargar la información del usuario actual
    if (currentUser) {
        profileUsernameInput.value = currentUser.username;
        // profilePic.src = currentUser.profilePicUrl || 'default-avatar.png';
        // Simular cargar pareja si existe
        if (currentPartner) {
            currentPartnerDisplay.textContent = currentPartner.username;
        } else {
            currentPartnerDisplay.textContent = 'Ninguna';
        }
    }
}

editUsernameButton.addEventListener('click', () => {
    profileUsernameInput.disabled = false;
    editUsernameButton.classList.add('hidden');
    saveUsernameButton.classList.remove('hidden');
});

saveUsernameButton.addEventListener('click', () => {
    // ESTO REQUIERE BACKEND: Enviar el nuevo nombre de usuario al servidor
    const newUsername = profileUsernameInput.value;
    if (newUsername && currentUser) {
        // Simular actualización
        currentUser.username = newUsername;
        currentUserDisplay.textContent = newUsername;
        profileUsernameInput.disabled = true;
        saveUsernameButton.classList.add('hidden');
        editUsernameButton.classList.remove('hidden');
        alert('Nombre de usuario actualizado (simulado).');
    }
});

editPicButton.addEventListener('click', () => {
    uploadProfilePicInput.click(); // Simular clic en el input de tipo file
});

uploadProfilePicInput.addEventListener('change', (event) => {
    // ESTO REQUIERE BACKEND: Subir la imagen al servidor
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePic.src = e.target.result;
            // Después de mostrarla, se enviaría al servidor
            alert('Foto de perfil actualizada (simulado).');
        };
        reader.readAsDataURL(file);
    }
});

// --- 6. Lógica de Agregar Pareja ---
function loadPartnerInfo() {
    // ESTO REQUIERE BACKEND: Cargar la pareja actual del usuario y las solicitudes pendientes
    if (currentUser) {
        // Simular que ya hay una pareja agregada
        // currentPartner = { id: 'partner456', username: 'MiRey' };
        // currentPartnerDisplay.textContent = currentPartner.username;

        // Simular solicitudes entrantes
        // renderIncomingRequests([{ id: 'req1', sender: 'EstrellaFugaz' }]);
    }
}

sendPartnerRequestButton.addEventListener('click', () => {
    // ESTO REQUIERE BACKEND: Enviar solicitud de pareja al servidor
    const partnerUsername = partnerUsernameInput.value.trim();
    if (currentUser && partnerUsername && partnerUsername !== currentUser.username) {
        partnerRequestMessage.textContent = `Enviando solicitud a ${partnerUsername}...`;
        partnerRequestMessage.style.color = 'yellow';
        // Lógica para enviar al backend (WebSocket o API REST)
        setTimeout(() => { // Simular respuesta del servidor
            partnerRequestMessage.textContent = `Solicitud enviada a ${partnerUsername}.`;
            partnerRequestMessage.style.color = 'green';
            partnerUsernameInput.value = '';
        }, 2000);
    } else {
        partnerRequestMessage.textContent = 'Ingresa un nombre de usuario válido y diferente al tuyo.';
        partnerRequestMessage.style.color = 'red';
    }
});

function renderIncomingRequests(requests) {
    incomingRequestsList.innerHTML = '';
    requests.forEach(req => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${req.sender} te ha enviado una solicitud de pareja.
            <button data-request-id="${req.id}" data-sender="${req.sender}" class="accept-request">Aceptar</button>
            <button data-request-id="${req.id}" class="deny-request deny">Rechazar</button>
        `;
        incomingRequestsList.appendChild(li);
    });
    // Event listeners para aceptar/rechazar solicitudes
    incomingRequestsList.querySelectorAll('.accept-request').forEach(button => {
        button.addEventListener('click', (event) => {
            // ESTO REQUIERE BACKEND: Aceptar solicitud
            const sender = event.target.dataset.sender;
            const requestId = event.target.dataset.requestId;
            // Simular aceptación
            currentPartner = { id: 'partnerId', username: sender }; // Asignar pareja
            currentPartnerDisplay.textContent = sender;
            alert(`¡Has aceptado a ${sender} como tu pareja de juego!`);
            loadPartnerInfo(); // Recargar la info para actualizar la UI
        });
    });
    incomingRequestsList.querySelectorAll('.deny-request').forEach(button => {
        button.addEventListener('click', (event) => {
            // ESTO REQUIERE BACKEND: Rechazar solicitud
            alert('Solicitud rechazada.');
            loadPartnerInfo(); // Recargar la info para actualizar la UI
        });
    });
}


// --- 7. Lógica de Revisión de Partidas ---
//chess.js y chessboard.js serían necesarios aquí
let reviewBoard = null;
let currentReviewChess = null; // Instancia de chess.js para la revisión
let currentReviewPgn = [];
let currentMoveIndex = -1;

function loadGameHistory() {
    // ESTO REQUIERE BACKEND: Cargar el historial de partidas con la pareja
    if (currentUser && currentPartner) {
        partnerForReview.textContent = currentPartner.username;
        playedGamesList.innerHTML = '';
        // Simular partidas
        const games = [
            { id: 'game1', date: '2023-10-26', result: 'Gana TuNombre' },
            { id: 'game2', date: '2023-10-20', result: 'Gana MiRey' },
        ];
        games.forEach(game => {
            const li = document.createElement('li');
            li.innerHTML = `
                Partida #${game.id} (${game.date}) - Resultado: ${game.result}
                <button class="review-game-button" data-game-id="${game.id}">Observar</button>
                <button class="rate-game-button" data-game-id="${game.id}">Calificar</button>
            `;
            playedGamesList.appendChild(li);
        });

        // Event listeners para los botones
        playedGamesList.querySelectorAll('.review-game-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const gameId = event.target.dataset.gameId;
                // ESTO REQUIERE BACKEND: Cargar la PGN (notación de la partida) desde el servidor
                // y luego inicializar el tablero de revisión.
                alert(`Simulando cargar partida ${gameId} para revisión.`);
                gameReviewDetails.classList.remove('hidden');
                currentReviewGameId.textContent = gameId;
                // reviewBoard = Chessboard('review-board-container', { position: 'start' }); // Inicializar chessboard.js
                // currentReviewChess = new Chess(); // Inicializar chess.js
                // currentReviewChess.load_pgn('1. e4 e5 2. Nf3 Nc6'); // Cargar PGN de ejemplo
                // currentReviewPgn = currentReviewChess.history();
                // currentMoveIndex = -1;
                // updateReviewBoard();
            });
        });

        playedGamesList.querySelectorAll('.rate-game-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const gameId = event.target.dataset.gameId;
                // ESTO REQUIERE BACKEND: Enviar la PGN de la partida al servidor para análisis
                // El servidor usaría un motor de ajedrez (Stockfish) para calificar los movimientos.
                alert(`Simulando calificación de partida ${gameId}. El servidor la analizaría.`);
                gameAnalysisOutput.innerHTML = `
                    <h4>Análisis de la partida:</h4>
                    <p>Movimiento Brillante: d4</p>
                    <p>Error Grave: ...Rh8</p>
                `;
            });
        });

        // Cargar estadísticas
        statsUser1.textContent = currentUser.username;
        statsUser2.textContent = currentPartner.username;
        winsUser1.textContent = '5'; // Simulado
        winsUser2.textContent = '3'; // Simulado
    } else {
        partnerForReview.textContent = 'N/A';
        playedGamesList.innerHTML = '<li>No tienes una pareja agregada o no hay partidas.</li>';
    }
}

function updateReviewBoard() {
    // Si tienes chessboard.js, actualiza la posición aquí
    // currentMoveInfo.textContent = currentReviewPgn[currentMoveIndex] || 'Inicio';
    // reviewBoard.position(currentReviewChess.fen());
}

prevMoveButton.addEventListener('click', () => {
    if (currentReviewChess && currentMoveIndex > -1) {
        currentReviewChess.undo();
        currentMoveIndex--;
        updateReviewBoard();
    }
});

nextMoveButton.addEventListener('click', () => {
    if (currentReviewChess && currentMoveIndex < currentReviewPgn.length - 1) {
        currentMoveIndex++;
        currentReviewChess.move(currentReviewPgn[currentMoveIndex]);
        updateReviewBoard();
    }
});


// --- 8. Lógica de la Página de Juego ---
let liveBoard = null; // Instancia de chessboard.js para la partida en vivo
let liveChess = null; // Instancia de chess.js para la partida en vivo
let gameRoomId = null; // ID de la sala de juego

function setupNewGame() {
    // ESTO REQUIERE BACKEND: Crear una sala de juego y conectar a los usuarios
    gameTitle.textContent = `Partida ${getCurrentGameNumber()}`; // Obtener de backend
    player1Name.textContent = currentUser.username;
    player2Name.textContent = currentPartner ? currentPartner.username : 'Esperando Jugador';

    // Inicializar el tablero, pero las piezas y el tiempo se configuran al iniciar la partida
    // liveBoard = Chessboard('chessboard-live-container', {
    //     position: 'empty', // O 'start' si las piezas están desde el inicio
    //     draggable: true,
    //     onDrop: handleMove, // Función para manejar el movimiento de piezas
    //     onSnapEnd: () => liveBoard.position(liveChess.fen()) // Ajustar después del movimiento
    // });
    // liveChess = new Chess();

    timeButtons.forEach(button => button.classList.remove('selected'));
    startGameButton.disabled = true;
    chatMessages.innerHTML = '';
    player1Timer.textContent = '--:--';
    player2Timer.textContent = '--:--';
    callStatus.classList.add('hidden');

    // ESTO REQUIERE WEBSOCKETS (Socket.IO): Conectar al servidor de juego
    // socket.emit('joinGameRoom', { partnerId: currentPartner.id });
}

function getCurrentGameNumber() {
    // ESTO REQUIERE BACKEND: Obtener el número de partidas jugadas con la pareja
    return 'X'; // Simulando "X"
}

timeButtons.forEach(button => {
    button.addEventListener('click', () => {
        timeButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedGameTime = parseInt(button.dataset.time);
        startGameButton.disabled = false;
    });
});

startGameButton.addEventListener('click', () => {
    if (currentUser && currentPartner && selectedGameTime) {
        // ESTO REQUIERE WEBSOCKETS (Socket.IO): Iniciar la partida
        alert(`Iniciando partida con ${currentPartner.username} con ${selectedGameTime} minutos.`);
        // socket.emit('startGame', { time: selectedGameTime });
        startGameButton.disabled = true; // Desactivar después de iniciar
        // Inicializar temporizadores y el tablero con piezas
        // liveBoard.position('start');
        // liveChess.reset();
        player1Timer.textContent = formatTime(selectedGameTime * 60);
        player2Timer.textContent = formatTime(selectedGameTime * 60);
    }
});

function handleMove(source, target) {
    // ESTO REQUIERE WEBSOCKETS (Socket.IO): Enviar el movimiento al servidor
    // const move = liveChess.move({ from: source, to: target, promotion: 'q' }); // 'q' para promoción de Dama por defecto
    // if (move === null) return 'snapback'; // Movimiento ilegal, regresa la pieza

    // alert(`Movimiento realizado: ${move.san}`);
    // socket.emit('chessMove', { move: move.san, roomId: gameRoomId });

    // return true; // Indica que el movimiento es válido para chessboard.js
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Chat en tiempo real
sendChatButton.addEventListener('click', () => {
    const message = chatTextInput.value.trim();
    if (message) {
        // ESTO REQUIERE WEBSOCKETS (Socket.IO): Enviar mensaje al servidor
        // socket.emit('sendMessage', { text: message, roomId: gameRoomId });
        addChatMessage(currentUser.username, message); // Mostrar en mi propio chat
        chatTextInput.value = '';
    }
});

function addChatMessage(sender, message) {
    const msgElement = document.createElement('div');
    msgElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll automático
}

// Chat de voz y Llamada (WebRTC y WebSockets)
voiceChatButton.addEventListener('click', () => {
    // ESTO REQUIERE WEBRTC y WEBSOCKETS: Iniciar/terminar chat de voz
    alert('Función de chat de voz (requiere permisos de micrófono y backend WebRTC)');
    // Obtener permisos de micrófono, establecer conexión WebRTC P2P
});
