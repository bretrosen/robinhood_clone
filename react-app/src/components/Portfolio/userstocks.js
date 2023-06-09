import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom';
import './userstocks.css'

export default function UserStocks({quantity, id}) {
    const { user } = useSelector(state => state)
    const sessionStocksObj = useSelector(state => state.stock.stocks);

    const stocks = Object.values(sessionStocksObj);

    // console.log('quantity from comp', quantity)
    // console.log('id from comp', id)
    // console.log('stocks from comp', sessionStocksObj)
    if (quantity < 0) return false

    return (
        <>
        <div className="stocks-on-user-list">

        <NavLink exact to={`/stocks/${Number(id)}`} className='stock-names'>{sessionStocksObj[Number(id)].name}</NavLink>
        <p className='stock-names'>{quantity.toFixed(4)}</p>
        </div>
        </>
    )
}
