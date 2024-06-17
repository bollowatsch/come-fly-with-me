import axios from 'axios';

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

const port = normalizePort(process.env.PORT || '5000');

export async function storeOptionsInJWT(options) {
    try {
        const response = await axios.post(`http://localhost:${port}/jwt/create-jwt`, { options });
        const token = response.data.token;
        localStorage.setItem('userOptionsToken', token);
    } catch (error) {
        console.error('Error creating JWT:', error);
    }
}

export async function getOptionsFromJWT() {
    const token = localStorage.getItem('userOptionsToken');
    if (!token) return null;

    try {
        const response = await axios.post(`http://localhost:${port}/jwt/verify-jwt`, { token });
        return response.data.options;
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return null;
    }
}
