class GlobalState {
    constructor() {
        this.state = {
            activePage: null,
            userRoles: []
        }
    }

    setActivePage = (page) => {
        this.state.activePage = page;
    }

    getActivePage = () => {
        return this.state.activePage;
    }

    setUserRoles = (roles) => {
        this.state.userRoles = roles;
    }

    getUserRoles = () => {
        return this.state.userRoles;
    }
}

let currentState = null;

export const getStore = () => {
    if (currentState === null) {
        currentState = new GlobalState();
    }
    return currentState;
}