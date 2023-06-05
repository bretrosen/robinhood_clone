// action type constant
const GET_STOCK = '/stock/GET_STOCK'

// action creator
const stockDetail = (data) => {
    return {
        type: GET_STOCK,
        data
    }
}

// thunk action creator
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

const initialState = { stock: null }

// reducer
export default function stockReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STOCK:
            return { stock: action.data };
        default:
            return state;
    }
}
