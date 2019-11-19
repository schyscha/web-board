export const changeNick = (nick) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CHANGE_NICK',
            nick
        });
    }
};
