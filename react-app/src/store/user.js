const initialState = { user: null };
const GET_PORTFOLIO = "user/GET_PORTFOLIO"
const POST_WATCHLIST = "user/POST_WATCHLIST"
const DELETE_WATCHLIST = "user/DELETE_WATCHLIST"
const PUT_WATCHLIST = "user/PUT_WATCHLIST"



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
const removeWatchlist = (id) => {
    return {
        type: DELETE_WATCHLIST,
        id
    }
}
const updateWatchlist = (name) => {
    return {
        type: PUT_WATCHLIST,
        name
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
export const putWatchlist  = (name, id) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name})
    })
    const updatedWatchlist = await response.json()
    console.log("updated watchlist insde the user reducer file ==============> ", updatedWatchlist);
    dispatch(updateWatchlist(updatedWatchlist))
}

export const deleteWatchlist = (id) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${id}`, {
        method: "DELETE"
    })
    const listDeleted = await response.json();
    console.log(listDeleted);
    dispatch(removeWatchlist(id))
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PORTFOLIO:
            return { ...action.data };
        case POST_WATCHLIST:
            const newWatchlist = action.newWatchlist;
            const updatedWatchlists = [...state.watch_lists, newWatchlist];
            return { ...state, watch_lists: updatedWatchlists };
        case DELETE_WATCHLIST:
            const deleteWatchlist = [...state.watch_lists].filter(list => list.id !== action.id)
            console.log(deleteWatchlist);
            return {...state, watch_lists: deleteWatchlist}
        default:
            return state;
    }
}
