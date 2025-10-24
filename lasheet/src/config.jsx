// src/config.jsx
const Mode = {
    DEV: 0,
    PROD: 1,
    TEST: 2
};

// Define el modo actual
const currentMode = Mode.DEV; // Cambia a Mode.PROD o Mode.TEST según el entorno

// Configura la URL base de la API en función del modo
let API_BASE_URL;

if (currentMode === Mode.DEV) {
    API_BASE_URL = 'http://localhost:5727';
} else if (currentMode === Mode.PROD) {
    API_BASE_URL = 'https://api.prosports.host';
} else {
    API_BASE_URL = 'http://test.prosports.host';
}

const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp']; // jfif is not supported
const ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'mov', 'avi'];
const MAX_IMAGES_POST = 10;

export { API_BASE_URL, MAX_IMAGES_POST, ALLOWED_EXTENSIONS, ALLOWED_VIDEO_EXTENSIONS };