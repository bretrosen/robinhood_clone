export const FetchNews = async (symbol, start, end) => {
    const response = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}L&from=${start}&to=${end}&token=${API_KEY}`)
    const news = await response.json()
}
