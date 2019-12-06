class TestState {
    constructor() {
        this.state = {
            activePage: null,
            isAuthenticated: false,
        }
    }

    setActivePage = (page) => {
        this.state.activePage = page;
    }

    getActivePage = () => {
        return this.state.activePage;
    }

    updateAuth = async (isAuthenticated) => {
        await this.setState({ isAuthenticated: isAuthenticated });
    }

    isAuthenticated = () => {
        return this.state.isAuthenticated;
    }

}

let currentState = null;

export const useState = () => {
    if (currentState === null) {
        currentState = new TestState();
    }
    return currentState;
}