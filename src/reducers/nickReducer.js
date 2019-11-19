const initState = "user";
const nickReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_NICK": {
            return action.nick;
        }
        default: {
            return state;
        }
    }
};

export default nickReducer;
