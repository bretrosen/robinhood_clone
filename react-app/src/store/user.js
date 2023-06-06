const initialState = { user: null };
const GET_PORTFOLIO = "user/GET_PORTFOLIO"
const POST_WATCHLIST = "user/POST_WATCHLIST"
const ADD_BUYING_POWER = "user/POST_ADD_BUYING_POWER"

//Actions

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

const addBuyingPower = (amount) => {
    return {
        type: ADD_BUYING_POWER,
        amount
    }
}


//Thunks

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
export const fetchAddBuyPower = (addedAmount) => async (dispatch) => {
    console.log('at start of thunk')
    const add = addedAmount.amount
    console.log('at start of thunk', add)
    const response = await fetch(`/api/users/${addedAmount.userId}/buying_power_add`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...addedAmount.buying})
    })
    const newUserAmount = await response.json()
    console.log('This is in the add buying power thunk', newUserAmount)
    // dispatch(addBuyingPower())
}

//Reducer

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
