import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { buyStockThunk, sellStockThunk } from '../../store/user'

export const TransactStock = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [quantity, setQuantity] = useState('')
    const [transactionType, setTransactionType] = useState('Buy')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const { stock } = useSelector(state => state.stock)
    const { user } = useSelector(state => state)

    const marketPrice = stock?.stock_history[0].price.toFixed(2)
    const buyingPower = user?.buying_power
    const estimatedCost = quantity * marketPrice
    // console.log("user", user)
    // console.log("market price", marketPrice)
    // console.log("buying power", buyingPower)

    //getting the quantity of the stock a user owns to display
    const transactions = user.transactions
    const { stockId } = useParams()
    let stockOwned = 0
    if (transactions) {
        for (let i = 0; i < Object.values(transactions).length; i++) {
            if (transactions[i].stock_id === parseInt(stockId) && transactions[i].purchased) {
                stockOwned += transactions[i].quantity
            }
            if (transactions[i].stock_id === parseInt(stockId) && !transactions[i].purchased) {
                stockOwned -= transactions[i].quantity
            }
        }
    }

    // error handling
    useEffect(() => {
        const newErrors = {}

        if (!quantity) newErrors['quantity'] = 'Quantity is required'
        if (transactionType === 'Sell' && quantity > stockOwned) newErrors['funds'] = "You can't sell more stock than you own!"
        if (transactionType === 'Buy' && estimatedCost > buyingPower) newErrors['funds'] = "You don't have enough buying power to place this order."
        // console.log("buying power check in useEffect", buyingPower - quantity * marketPrice)
        setErrors(newErrors)
    }, [quantity, marketPrice, buyingPower])

    const handleSubmit = async (event) => {
        event.preventDefault()

        setHasSubmitted(true)

        if (!Object.values(errors).length) {

            if (transactionType === 'Buy') {
                // object to match the thunk and backend buy route
                const buyStockObj = {
                    "id": stock.id,
                    "quantity": Number(quantity),
                    "price_purchased": marketPrice
                }
                // console.log("dispatching the buy stock thunk from form =>", buyStockObj)
                await dispatch(buyStockThunk(buyStockObj))
                history.push('/transactions')
            }

            if (transactionType === 'Sell') {
                const sellStockObj = {
                    "id": stock.id,
                    "quantity": Number(quantity),
                    "price_sold": marketPrice
                }
                // console.log("dispatching the sell stock thunk from form =>", sellStockObj)
                await dispatch(sellStockThunk(sellStockObj))
                history.push('/transactions')
            }
        }
    }

    return (
        <div className='transact-form-container'>
            <div className='transact-field-heading'>{stock.symbol} </div>
            <form className='transact-form' onSubmit={handleSubmit}>
                <div className='transact-error'>
                    {hasSubmitted && errors.funds && (
                        <p>{errors.funds}</p>
                    )}
                </div>
                <div className='transact-field'>
                    <label>
                        Order Type &nbsp;
                        <select
                            value={transactionType}
                            className='select-field'
                            onChange={e => setTransactionType(e.target.value)}
                        >
                            <option value='Buy'>Buy</option>
                            <option value='Sell'>Sell</option>
                        </select>
                    </label>
                </div>
                <input className='transact-field' type='number' min='0.1' step='0.1' placeholder="Shares"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)} />
                <div className='market-price'>
                    <div className='market-price-label'>
                        Market Price
                    </div>
                    <div className='market-price-number'>
                        ${marketPrice}
                    </div>
                </div>
                <div className='estimated-cost'>
                    <div className='estimated-cost-label'>
                        Estimated Cost
                    </div>
                    <div className='estimated-cost-number'>
                        ${estimatedCost.toFixed(2)}
                    </div>
                </div>
                <button className='transact-button'>Place Order</button>
                <div className='buying-power'>
                    ${buyingPower?.toLocaleString(undefined, {    minimumFractionDigits: 2,
                        maximumFractionDigits: 2,})} buying power available
                </div>
                {stockOwned > 0 && <div className='stock-owned'>
                    You have {stockOwned.toFixed(2)} shares of {stock.symbol}
                </div>}
                {stockOwned <= 0 && <div className='stock-owned'>
                    You have no shares of {stock.symbol}
                </div>}

            </form>
        </div>
    )
}
