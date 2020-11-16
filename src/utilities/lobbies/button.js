export async function onButtonClickSignOut() {
    this.props.setIsLoading(true);

    const userID = this.props.getUserID;
    const result = await fetch("/api/signout", {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            userID: userID
        })
    });
    const json = await result.json();

    this.props.setIsLoading(false);
    this.props.setUserID("");
    this.props.location.setMessage(json.message);
};

export async function onButtonClickCreateRoom() {
    const userID = this.props.getUserID;
    const result = await fetch("/room/create", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            userID: userID
        })
    });
    const json = await result.json();

    this.setState({
        roomID: json.roomID
    });
};