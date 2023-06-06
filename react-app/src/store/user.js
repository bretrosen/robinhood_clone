const initialState = { user: null };
const GET_PORTFOLIO = "user/GET_PORTFOLIO"
const POST_WATCHLIST = "user/POST_WATCHLIST"


const userPortfolio = (data) => {
    return {
        type: GET_PORTFOLIO,
        data
    }
}

const createWatchlist = (newWatchlist) => {
    return {
        type: POST_WATCHLIST,
        newWatchlist
    }
}
export const fetchPortfolio  = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/portfolio`)
    const portfolio = await response.json()
    console.log("portfolio insde the user reducer file ==============",portfolio);
    dispatch(userPortfolio(portfolio))
}
export const postWatchlist  = (name) => async (dispatch) => {
    const response = await fetch(`/api/watchlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name})
    })
    const newWatchlist = await response.json()
    // console.log("portfolio insde the user reducer file ==============",newWatchlist);
    dispatch(createWatchlist(newWatchlist))
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PORTFOLIO:
            return { ...action.data };
        case POST_WATCHLIST:
            const newWatchlist = action.newWatchlist;
            const updatedWatchlists = [...state.watch_lists, newWatchlist];
            return { ...state, watch_lists: updatedWatchlists };
        default:
            return state;
    }
}
