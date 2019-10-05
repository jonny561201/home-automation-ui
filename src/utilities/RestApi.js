export const getBearerToken = async () => {
    const response = await fetch('http://localhost:5000/login');
    if (response.ok) {
        const jsonResponse = await response.json();
        return await jsonResponse.bearerToken;
    }
    if (response.status === 401) {
        return "unauthorized";
    }
}