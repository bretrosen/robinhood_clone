import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { stockDetailsThunk } from '../../store/stock'

export default function StockDetails() {
    const dispatch = useDispatch();
    const { stockId } = useParams();
    console.log("stock id from component =>", stockId)

    useEffect(() => {
        dispatch(stockDetailsThunk(stockId));
    }, [dispatch])

    return (
        <div>
            <h1>Stock Details</h1>
        </div>
    )
}
