class GlobalState {
    constructor() {
        this.state = {
            activePage: null,
            userRoles: [],
            firstName: "",
            lastName: "",
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