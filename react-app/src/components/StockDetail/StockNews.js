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

    console.log("stock news array", Object.values(stockNews).length)

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
    // stockNews.datetime for microseconds

    const shortNews = stockNews.slice(0,5)
    const timeNow = new Date().getTime()

    return (
        <div>
            <h2 className='stock-news'>Recent Stock News</h2>
            <br></br>
            {Object.values(shortNews).length > 0 &&
             shortNews.map(story => (
                <a className='news-story' href={story.url} target="_blank">
                    <div>[{story.source}] {Math.round((timeNow / 1000 - story.datetime) / 3600)}h</div>
                    {/* <img className='news-image' src={story.image}></img> */}
                    <div className='news-headline'>{story.headline}</div>
                </a>
             ))
            }
        </div>
    )
}
