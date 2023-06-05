import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyStockThunk, sellStockThunk } from '../../store/stock'

export const BuySomeStock = () => {
    const dispatch = useDispatch()
    const stock = useSelector(state => state.stock)
    const handleSubmit = () => {
        dispatch(buyStockThunk(stock))
    }


    return (
        <div>
            <div>Buy {stock.symbol} </div>

        </div>
    )

}
