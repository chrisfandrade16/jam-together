export async function onInputChangeSignInIdentifier(event) {
    this.setState({
        signInIdentifier: event.target.value
    });
};

export async function onInputChangeSignInPassword(event) {
    this.setState({
        signInPassword: event.target.value
    });
};

export async function onInputChangeSignUpEmail(event) {
    this.setState({
        signUpEmail: event.target.value
    });
};

export async function onInputChangeSignUpUsername(event) {
    this.setState({
        signUpUsername: event.target.value
    });
};

export async function onInputChangeSignUpPassword(event) {
    this.setState({
        signUpPassword: event.target.value
    });
};
