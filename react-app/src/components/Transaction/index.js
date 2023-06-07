import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyStockThunk, sellStockThunk } from '../../store/user'

export const BuySomeStock = () => {

    const [quantity, setQuantity] = useState('')
    const dispatch = useDispatch()
    const { stock } = useSelector(state => state.stock)
    const marketPrice = stock?.stock_history[0].price
    const handleSubmit = async (event) => {
        event.preventDefault()
        // object to match the thunk and backend buy route
        // needs id, quantity, price_purchased
        const stockObj = {
            "id": stock.id,
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
    const { stock } = useSelector(state => state.stock)
    const marketPrice = stock?.stock_history[0].price
    const handleSubmit = async (event) => {
        event.preventDefault()
        // object to match the thunk and backend buy route
        // needs id, quantity, price_purchased
        const stockObj = {
            "id": stock.id,
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

// not quite working

// export const TransactStock = () => {
//     const dispatch = useDispatch()

//     const TRANSACTION_TYPES = ['Buy', 'Sell']
//     const [quantity, setQuantity] = useState('')
//     const [transactionType, setTransactionType] = useState(TRANSACTION_TYPES[0])
//     const [errors, setErrors] = useState({})
//     const [hasSubmitted, setHasSubmitted] = useState(false)

//     const { stock } = useSelector(state => state.stock)
//     const { user } = useSelector(state => state)

//     const marketPrice = stock?.stock_history[0].price.toFixed(2)
//     const buyingPower = user?.buying_power
//     console.log("user", user)
//     console.log("market price", marketPrice)
//     console.log("buying power", buyingPower)



//     useEffect(() => {
//         const newErrors = {}

//         // if (!quantity) newErrors['quantity'] = 'Quantity is required'
//         if (quantity * marketPrice > buyingPower) newErrors['funds'] = "You don't have enough buying power to place this order."
//         console.log("buying power check in useEffect", buyingPower - quantity * marketPrice)
//         setErrors(newErrors)
//     }, [quantity, marketPrice, buyingPower])

//     const handleSubmit = async (event) => {
//         event.preventDefault()

//         setHasSubmitted(true)

//         // object to match the thunk and backend buy route
//         // needs id, quantity, price_purchased
//         if (transactionType === 'Buy') {
//             const buyStockObj = {
//                 "id": stock.id,
//                 "quantity": Number(quantity),
//                 "price_purchased": marketPrice
//             }
//             console.log("dispatching the buy stock thunk from form =>", buyStockObj)
//             await dispatch(buyStockThunk(buyStockObj))
//             setQuantity(0)
//         }

//         if (transactionType === 'Sell') {
//             const sellStockObj = {
//                 "id": stock.id,
//                 "quantity": Number(quantity),
//                 "price_sold": marketPrice
//             }
//             console.log("dispatching the sell stock thunk from form =>", sellStockObj)
//             await dispatch(sellStockThunk(sellStockObj))
//             setQuantity(0)
//         }

//     }

//     return (
//         <div className='transact-form'>
//             <div>{stock.symbol} </div>
//             <form onSubmit={handleSubmit}>
//                 {/* <div>
//                     {hasSubmitted && errors.quantity && (
//                         <p>{errors.quantity}</p>
//                     )}
//                 </div> */}
//                 <div>
//                     {hasSubmitted && errors.funds && (
//                         <p>{errors.funds}</p>
//                     )}
//                 </div>
//                 <div>
//                     <label>
//                         Select Transaction Type
//                         <select
//                             name='transactionType'
//                             value={transactionType}
//                             onChange={e => setTransactionType(e.target.value)}
//                         >
//                             {TRANSACTION_TYPES.map(type => {
//                                 <option
//                                     key={type}
//                                     value={type}
//                                 >
//                                     {type}
//                                 </option>
//                             })}
//                         </select>
//                     </label>
//                 </div>
//                 <input placeholder="Quantity"
//                     value={quantity}
//                     onChange={e => setQuantity(e.target.value)} />
//                 <button>Place Order</button>
//             </form>
//         </div>
//     )
// }
