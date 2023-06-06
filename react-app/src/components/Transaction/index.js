import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyStockThunk, sellStockThunk } from '../../store/user'

export const BuySomeStock = () => {

    const [quantity, setQuantity] = useState('')
    const dispatch = useDispatch()
    const {stock} = useSelector(state => state.stock)
    const marketPrice = stock?.stock_history[0].price
    const handleSubmit = async (event) => {
        event.preventDefault()
        // object to match the thunk and backend buy route
        // needs id, quantity, price_purchased
        const stockObj = {
            "id": stock.id,
            // convert to number with 2 decimal points
            "quantity": Number(quantity),
            "price_purchased": marketPrice
        }
        console.log("dispatching the buy stock thunk from form =>", stockObj)
        await dispatch(buyStockThunk(stockObj))
        setQuantity(0)
    }
    console.log('this is stock', stock)
    return (
        <div>
            <div>Buy {stock.symbol} </div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Quantity"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)} />
                <button>Buy Stock</button>
                </form>
        </div>
    )

}



export const SellSomeStock = () => {

    const [quantity, setQuantity] = useState('')
    const dispatch = useDispatch()
    const {stock} = useSelector(state => state.stock)
    const marketPrice = stock?.stock_history[0].price
    const handleSubmit = async (event) => {
        event.preventDefault()
        // object to match the thunk and backend buy route
        // needs id, quantity, price_purchased
        const stockObj = {
            "id": stock.id,
            // convert to number with 2 decimal points
            "quantity": Number(quantity),
            "price_sold": marketPrice
        }
        console.log("dispatching the sell stock thunk from form =>", stockObj)
        await dispatch(sellStockThunk(stockObj))
        setQuantity(0)
    }

    return (
        <div>
            <div>Sell {stock.symbol} </div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Quantity"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)} />
                <button>Sell Stock</button>
                </form>
        </div>
    )

}
