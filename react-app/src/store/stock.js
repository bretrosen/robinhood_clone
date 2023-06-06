// action type constants
const GET_STOCK = 'stock/GET_STOCK'
const BUY_STOCK = 'stock/BUY_STOCK'
const SELL_STOCK = 'stock/SELL_STOCK'

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

const initialState = { stock: null, user: null}

// reducer
export default function stockReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STOCK:
            return { ...action.stock };
        default:
            return state;
    }
}
