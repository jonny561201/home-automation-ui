class GlobalState {
    constructor() {
        this.state = {
            activePage: null,
            isAuthenticated: false,
            bearerToken: null,
            userId: null,
            userRoles: [],
            firstName: null,
            lastName: null,
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

    getUserId = () => {
        return this.state.userId;
    }

    setUserRoles = (roles) => {
        this.state.userRoles = roles;
    }

    getUserRoles = () => {
        return this.state.userRoles;
    }

    setFirstName = (name) => {
        this.state.firstName = name;
    }

    getFirstName = () => {
        return this.state.firstName;
    }

    setLastName = (name) => {
        this.state.lastName = name;
    }

    getLastName = () => {
        return this.state.lastName;
    }
}

let currentState = null;

export const getStore = () => {
    if (currentState === null) {
        currentState = new GlobalState();
    }
    return currentState;
}