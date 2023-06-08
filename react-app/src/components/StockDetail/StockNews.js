import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function StockNewsList() {

    async function FetchNews(symbol, start, end, API_KEY) {
        const response = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${start}&to=${end}&token=${API_KEY}`)
        const news = await response.json()
        return news
    }

    const { stock } = useSelector(state => state.stock)
    const [stockNews, setStockNews] = useState([])

    // getting the news feed
    const symbol = stock.symbol
    console.log("stock symbol", symbol)
    const today = new Date()
    console.log("today's date format", today.toISOString().split('T')[0])
    const yesterday = new Date(new Date() - 86400000)
    console.log("yesterday's date format", yesterday.toISOString().split('T')[0])
    const API_KEY = 'ci139b1r01qikcusfrt0ci139b1r01qikcusfrtg'

    useEffect(() => {
        FetchNews(symbol, yesterday.toISOString().split('T')[0], today.toISOString().split('T')[0], API_KEY)
            .then(news => {
                setStockNews(news)
            })
    }, [symbol])

    // stockNews.url for link
    // stockNews.image for image
    // stockNews.source for source
    // stockNews.summary for summary
    // stockNews.headline for headline

    return (
        <div>
            <h2 className='stock-news'>Recent Stock News</h2>
            <br></br>
            <a href={stockNews[0].url} target="_blank">
                <div>Source: {stockNews[0].source}</div>
                <h4>{stockNews[0].headline}</h4>
            </a>
            <br></br>
            <a href={stockNews[1].url} target="_blank">
                <div>Source: {stockNews[1].source}</div>
                <h4>{stockNews[1].headline}</h4>
            </a>
            <br></br>
            <a href={stockNews[2].url} target="_blank">
                <div>Source: {stockNews[2].source}</div>
                <h4>{stockNews[2].headline}</h4>
            </a>
        </div>
    )
}
