const ALL_HISTORY = '/stocks/ALL_HISTORY';

const allHistory = (history) => {
    return {
        type: ALL_HISTORY,
        history
    };
};


export const fetchAllHistory = () => async (dispatch) => {
    const response = await fetch(`/api/stocks/all_history`)

    if (response.ok) {
        const history = await response.json();
        dispatch(allHistory(history));
    }
}


const initialState = { history: {}}

export default function historyReducer(state = initialState, action) {

    let historyState;

    switch (action.type) {

        case ALL_HISTORY:

            const allHistory = action.history.history
            historyState = {...state, history: {...state.history}}

            allHistory.forEach((item) => {
                historyState.history[item.id] = item;
            });

            return historyState;

        default:
            return state;
    }
}
