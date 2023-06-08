import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { stockDetailsThunk } from '../../store/stock'
import StockChart from './StockChart'
import DailyStockChart from './DailyStockChart'
import { TransactStock } from '../Transaction'
import { fetchPortfolio } from '../../store/user'
import './StockDetail.css'
import '../Transaction/Transaction.css'
import OpenModalButton from '../OpenModalButton'
import WatchlistComponent from '../Watchlist/WatchlistComponent'
import AddStockModal from '../Watchlist/AddStockModal'



export default function StockDetails() {
    const dispatch = useDispatch()
    const { stockId } = useParams()
    const {stock} = useSelector(state => state.stock)
    const sessionUser = useSelector(state => state.session.user);
    const [fullDescription, setFullDescription] = useState(true)
    // const description = stock?.description
    // const descriptionSentences = description?.split('.')
    // descriptionSentences && descriptionSentences.slice(0,2)

    // trigger thunk dispatch for getting stock and user portfolio
    useEffect(() => {
        dispatch(stockDetailsThunk(stockId));
        dispatch(fetchPortfolio(sessionUser.id))
    }, [dispatch, stockId, sessionUser.id])

    console.log('====>this is stock from stock details', stock)

    const prices = stock?.stock_history
    console.log('====>this is prices from stock details', prices)
    if (!prices) {
        return <h1>Loading...</h1>
    }

    console.log("price object", prices)
    const newestPrice = prices[0].price.toFixed(2);
    const oldestPrice = prices[prices.length - 1].price.toFixed(2);
    const priceDiff = newestPrice - oldestPrice;
    console.log("newest price", newestPrice)
    console.log("oldest price", oldestPrice)
    let performanceClassName

    if (priceDiff >= 0) {
        performanceClassName = 'stock-positive';
    } else {
        performanceClassName = 'stock-negative'
    }

    // button toggle to show more or less of stock description
    const toggleDescription = () => {
        setFullDescription(!fullDescription)
    }

    return (
        <div className='stock-details-wrapper'>

            <div className='stock-details-page'>
                <div className='stock-details-top'>
                    <div>
                        <h1>{stock.name}</h1>
                        <>
                            <h1>${newestPrice}</h1>
                            <div className={performanceClassName}>
                                ${(newestPrice - oldestPrice).toFixed(2)}
                                &nbsp;
                                ({(((newestPrice - oldestPrice) / oldestPrice) * 100).toFixed(2)}%)


                                &nbsp;Past&nbsp;
                                {((new Date(prices[0].time_stamp) - new Date(prices[prices.length - 1].time_stamp)) / 86400000).toFixed(0)} days
                            </div>
                        </>

                    </div>
                    <div className='stock-chart'>
                        <StockChart />
                        {/* <DailyStockChart /> */}
                    </div>
                </div>
                <div className='stock-about'>
                    <h2 className='about-text'>About</h2>
                    <div className='about-block'>
                        {fullDescription &&
                        <>
                        <p>{stock.description}</p>
                        <button className='toggle-description' onClick={toggleDescription}>Show less</button>
                        </>}
                        {!fullDescription &&
                        <>
                        <p>{stock.description.split('.').slice(0,2)}.</p>
                        <button className='toggle-description' onClick={toggleDescription}>Show more</button>
                        </>}
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
            <div className='transactions'>
                <TransactStock />
                <OpenModalButton type="watchlist" modalComponent={<AddStockModal stock={stock} />}/>
            </div>

        </div>
    )
}
