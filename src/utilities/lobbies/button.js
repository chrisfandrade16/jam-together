import { getFromStorage } from "../storage.js";

export async function onButtonClickSignOut() {
    this.setState({
        isLoading: true
    });

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
                signOut: true,
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

export async function onButtonClickCreateRoom() {
    const {user_id} = this.state;

    const result = await fetch("/room/create", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            user_id: user_id
        })
    });
    const json = await result.json();

    this.setState({
        room_id: json.room_id
    });
};