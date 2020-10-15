export function getFromStorage(key) {
    if(!key) {
        return null;
    }

    try {
        const value = localStorage.getItem(key);

        if(value) {
            return JSON.parse(value);
        }

        return null;
    }
    catch(error) {
        return null;
    }
};

export function setInStorage(key, value) {
    if(!key) {
        console.error("Error: Key is missing.");
    }

    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch(error) {
        console.error(error);
    }
};
