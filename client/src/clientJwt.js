import axios from 'axios';

export async function storeOptionsInJWT(options) {
    try {
        const response = await axios.post('http://localhost:5000/jwt/create-jwt', { options });
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
        const response = await axios.post('http://localhost:5000/jwt/verify-jwt', { token });
        return response.data.options;
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return null;
    }
}
