import { getFromStorage, setInStorage } from "../../utilities/authentication/storage.js";

export async function onButtonClickSignIn() {
    this.setState({
        isLoading: true
    });

    const { signInIdentifier, signInPassword } = this.state;
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

    await setInStorage("jam-together", { 
        token: json.token
    });

    if(json.success) {
        this.setState({
            isLoading: false,
            token: json.token,
            message: json.message,
            signInIdentifier: "",
            signInPassword: "",
        });
    }
    else {
        this.setState({
            isLoading: false,
            message: json.message,
        });
    }
};

export async function onButtonClickSignUp() {
    this.setState({
        isLoading: true
    });;

    const { signUpEmail, signUpUsername, signUpPassword } = this.state;
    const result = await fetch("api/signup", {
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
            isLoading: false,
            message: json.message,
            signUpEmail: "",
            signUpUsername: "",
            signUpPassword: ""
        });
    }
    else {
        this.setState({
            isLoading: false,
            message: json.message,
        });
    }
};

export async function onButtonClickSignOut() {
    this.setState({
        isLoading: true
    });;

    const object = await getFromStorage("jam-together");

    if(object && object.token) {
        const { token } = object;
        const result = await fetch("/api/signout", {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            token: token
        })
    });
        const json = await result.json();

        if(json.success) {
            this.setState({
                isLoading: false,
                token: "",
                message: json.message
            });
        }
        else {
            this.setState({
                isLoading: false,
                message: json.message
            });
        }
    }
    else {
        this.setState({ 
            isLoading: false,
        });
    }
};
