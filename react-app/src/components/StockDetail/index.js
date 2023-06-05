import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { stockDetailsThunk } from '../../store/stock'
import './StockDetail.css'

export default function StockDetails() {
    const dispatch = useDispatch()
    const { stockId } = useParams()
    const stock = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(stockDetailsThunk(stockId));
    }, [dispatch, stockId])

    return (
        <div className='stock-details-page'>
            <div className='stock-details-top'>
                <div>
                    <h1>{stock.name}</h1>
                    <h1>$xx.xx</h1>
                    <div>+- $xx.xx (+- xx.xx%) Past (time interval)</div>
                </div>
                <div>
                    <h1>Graph</h1>
                </div>
            </div>
            <div className='stock-about'>
                <h2 className='about-text'>About</h2>
                <div className='about-block'>
                    <p>{stock.description}</p>
                    <div className='about-fields'>
                        <div>
                            <div className='stock-label'>CEO</div>
                            <div>{stock.stock_ceo}</div>
                        </div>
                        <div>
                            <div className='stock-label'>Employees</div>
                            <div>{stock.employees}</div>
                        </div>
                        <div>
                            <div className='stock-label'>Headquarters</div>
                            <div>{stock.headquarters}</div>
                        </div>
                        <div>
                            <div className='stock-label'>Founded</div>
                            <div>{stock.year_founded}</div>
                        </div>
                    </div>
                </div >
                <h2 className='about-text'>Key statistics</h2>
                <div className='about-fields'>
                    <div>
                    <div className='stock-label'>Market cap</div>
                    <div>{(stock.market_cap / 1000000000).toFixed(2)}B</div>
                    </div>
                    <div>
                    <div className='stock-label'>Price-Earnings ratio</div>
                    <div>{stock.pe_ratio}</div>
                    </div>
                    {stock.dividend > 0 &&
                        <div>
                            <div className='stock-label'>Dividend yield</div>
                            <div>{stock.dividend}%</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
