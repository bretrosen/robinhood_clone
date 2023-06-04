const initialState = { user: null };
const GET_PORTFOLIO = "user/GET_PORTFOLIO"


const userPortfolio = (data) => {
    return {
        type: GET_PORTFOLIO,
        data
    }
}
export const fetchPortfolio  = (userId) => async (dispatch) => {
    const response = await fetch(`api/users/${userId}/portfolio`)
    const portfolio = await response.json()
    console.log("portfolio insde the user reducer file ==============",portfolio);
    dispatch(userPortfolio(portfolio))
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PORTFOLIO:
            return { ...action.data };
        default:
            return state;
    }
}
