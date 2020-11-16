import { setInStorage } from "../storage.js";

export async function onButtonClickSignIn() {
    this.props.setIsLoading(true);

    const { signInIdentifier, signInPassword, rememberMe } = this.state;
    const type = signInIdentifier.includes("@")  ? "email" : "username";
    const result = await fetch("/api/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            [type]: signInIdentifier,
            password: signInPassword
        })
    });
    const json = await result.json();

    if(rememberMe) {
        await setInStorage("jam-together", { 
            userID: json.userID
        });
    }
    else {
        const result = await fetch("/api/signout", {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                userID: json.userID
            })
        });
    }

    if(json.success) {
        this.setState({
            message: json.message,
            signInIdentifier: "",
            signInPassword: ""
        });
        this.props.setIsLoading(false);
        this.props.setUserID(json.userID);
    }
    else {
        this.setState({
            message: json.message,
            signInIdentifier: "",
            signInPassword: ""
        });
        this.props.setIsLoading(false);
    }
};

export async function onButtonClickSignUp() {
    this.props.setIsLoading(true);

    const { signUpEmail, signUpUsername, signUpPassword } = this.state;
    const result = await fetch("/api/signup", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email: signUpEmail,
            username: signUpUsername,
            password: signUpPassword
        })
    });
    const json = await result.json();

    if(json.success) {
        this.setState({
            message: json.message,
            signUpEmail: "",
            signUpUsername: "",
            signUpPassword: ""
        });
        this.props.setIsLoading(false);
    }
    else {
        this.setState({
            message: json.message,
        });
        this.props.setIsLoading(false);
    }
};
