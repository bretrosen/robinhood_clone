// action type constants
const GET_STOCK = '/stock/GET_STOCK'
const ALL_STOCKS = '/stocks/ALL_STOCKS'


// action creator
const stockDetail = (stock) => {
    return {
        type: GET_STOCK,
        stock
    }
}

const allStocks = (stocks) => {
    return {
        type: ALL_STOCKS,
        stocks
    }
}


// thunk action creators
export const stockDetailsThunk = (stockId) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${stockId}`)
    // console.log('sending stock details thunk')

    if (response.ok) {
        const stockDetails = await response.json()
        // console.log("returning stock details thunk =>", stockDetails)
        dispatch(stockDetail(stockDetails))
        return null;
    } else if (response.status < 500) {
        // console.log("response status", response.status)
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        // console.log("An error occured")
        return ["An error occurred. Please try again."];
    }
}

export const fetchAllStocks = () => async (dispatch) => {
    const response = await fetch(`/api/stocks/`)

    if (response.ok) {
        const stocks = await response.json()
        dispatch(allStocks(stocks))
    }
}

const initialState = { stock: {},  stocks: {}}


// reducer
export default function stockReducer(state = initialState, action) {

    let stockState;

    switch (action.type) {
        case GET_STOCK:
            stockState = {...state, stock: {...state.stock}, stocks: {...state.stocks}}

            stockState.stock = action.stock

            return stockState

        case ALL_STOCKS:

            const allStocks = action.stocks.stocks
            stockState = {...state, stock: {...state.stock}, stocks: {...state.stocks}}

            allStocks.forEach((stock) => {
                stockState.stocks[stock.id] = stock;
            });

            return stockState;

        default:
            return state;
    }
}
