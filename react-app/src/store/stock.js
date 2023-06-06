// action type constants

const GET_STOCK = '/stock/GET_STOCK'
const BUY_STOCK = '/stock/BUY_STOCK'
const SELL_STOCK = '/stock/SELL_STOCK'
const ALL_STOCKS = '/stocks/ALL_STOCKS'


// action creators
const stockDetail = (stock) => {
    return {
        type: GET_STOCK,
        stock
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

const allStocks = (stocks) => {
    return {
        type: ALL_STOCKS,
        stocks
    }
}

// thunk action creators
export const stockDetailsThunk = (stockId) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${stockId}`)
    console.log('sending stock details thunk')

    if (response.ok) {
        const stockDetails = await response.json()
        console.log("returning stock details thunk =>", stockDetails)
        dispatch(stockDetail(stockDetails))
        return null;
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

export const buyStockThunk = (stock) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${stock.id}/buy_stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"quantity": stock.quantity,
               "price_purchased": stock.price_purchased})
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
        body: JSON.stringify(stock)
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

        case BUY_STOCK:
            return { ...action.stock };
        case SELL_STOCK:
            return { ...action.stock };
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
