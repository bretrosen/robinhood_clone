const initialState = { user: null };
const GET_PORTFOLIO = "user/GET_PORTFOLIO"
const POST_WATCHLIST = "user/POST_WATCHLIST"
const BUY_STOCK = 'user/BUY_STOCK'
const SELL_STOCK = 'user/SELL_STOCK'


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

const buyStock = (stock) => {
    return {
        type: BUY_STOCK,
        stock
    }
}

const sellStock = (stock) => {
    return {
        type: SELL_STOCK,
        stock
    }
}

export const fetchPortfolio = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/portfolio`)
    const portfolio = await response.json()
    console.log("portfolio insde the user reducer file ==============", portfolio);
    dispatch(userPortfolio(portfolio))
}
export const postWatchlist = (name) => async (dispatch) => {
    const response = await fetch(`/api/watchlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    })
    const newWatchlist = await response.json()
    // console.log("portfolio insde the user reducer file ==============",newWatchlist);
    dispatch(createWatchlist(newWatchlist))
}

export const buyStockThunk = (stock) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${stock.id}/buy_stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "quantity": stock.quantity,
            "price_purchased": stock.price_purchased
        })
    })
    console.log('sending buy stock thunk', response)

    if (response.ok) {
        const stockBought = await response.json();
        console.log('returning buy stock thunk', stockBought)
        dispatch(buyStock(stockBought))
    } else if (response.status < 500) {
        console.log("response status", response.status)
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        console.log("An error occured")
        return ["An error occurred. Please try again."];
    }
}

export const sellStockThunk = (stock) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${stock.id}/sell_stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "quantity": stock.quantity,
            "price_sold": stock.price_sold
        })
    })
    console.log('sending sell stock thunk', response)

    if (response.ok) {
        const stockSold = await response.json();
        console.log('returning sell stock thunk', stockSold)
        dispatch(sellStock(stockSold))
    } else if (response.status < 500) {
        console.log("response status", response.status)
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        console.log("An error occured")
        return ["An error occurred. Please try again."];
    }
}

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PORTFOLIO:
            return { ...action.data };
        case POST_WATCHLIST:
            const newWatchlist = action.newWatchlist;
            const updatedWatchlists = [...state.watch_lists, newWatchlist];
            return { ...state, watch_lists: updatedWatchlists };
        case BUY_STOCK:
            const newTransaction = action.stock;
            const purchase = action.stock.price_purchased * action.stock.quantity;
            const updatedBuyingPower = state.buying_power - purchase;
            const updatedTransactions = [...state.transactions, newTransaction]
            return { ...state, transactions: updatedTransactions, buying_power: updatedBuyingPower }
        case SELL_STOCK:
            const newTransactionSell = action.stock;
            const sale = action.stock.price_sold * action.stock.quantity;
            const updatedBuyingPowerSell = state.buying_power + sale;
            const updatedTransactionsSell = [...state.transactions, newTransactionSell]
            return { ...state, transactions: updatedTransactionsSell, buying_power: updatedBuyingPowerSell }
        default:
            return state;
    }
}
