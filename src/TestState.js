class TestState {
    constructor() {
        this.state = {
            activePage: null,
            isAuthenticated: false,
            bearerToken: null,
            userId: null,
        }
    }

    setActivePage = (page) => {
        this.state.activePage = page;
    }

    getActivePage = () => {
        return this.state.activePage;
    }

    updateAuth = (isAuthenticated) => {
        this.state.isAuthenticated = isAuthenticated;
    }

    isAuthenticated = () => {
        return this.state.isAuthenticated;
    }

    setBearerToken = (token) => {
        this.state.bearerToken = token;
    }

    getBearerToken = () => {
        return this.state.bearerToken;
    }

    setUserId = (userId) => {
        this.state.userId = userId;
    }
}

let currentState = null;

export const useState = () => {
    if (currentState === null) {
        currentState = new TestState();
    }
    return currentState;
}