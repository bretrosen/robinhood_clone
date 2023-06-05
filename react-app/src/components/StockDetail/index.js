import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { stockDetailsThunk } from '../../store/stock'

export default function StockDetails() {
    const dispatch = useDispatch()
    const stock = useSelector (state => state.stock)
    console.log("stock from component =>", stock)

    useEffect(() => {
        dispatch(stockDetailsThunk(stock.id));
    }, [dispatch])

    return (
        <div>
            <h1>Stock Details</h1>
        </div>
    )
}
