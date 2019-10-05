export const getBearerToken = async () => {
    const response = await fetch('http://localhost:5000/login');
    const jsonResponse = await response.json();
    return jsonResponse;
}