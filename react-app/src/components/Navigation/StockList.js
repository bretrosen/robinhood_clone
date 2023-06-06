

export default function StockList ({stock, id, search}) {

    return (
        <>
        {stock.symbol.startsWith(search.toUpperCase()) &&
        <li>{stock.symbol} {stock.name}</li>
        }

        </>
    )

}
