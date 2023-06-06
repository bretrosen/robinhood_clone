import { NavLink } from 'react-router-dom';

export default function StockList ({stock, id, search, list, setList}) {

    if (stock.symbol.startsWith(search.toUpperCase())) {
        setList(stock.symbol)
    }

    if (search.length === 0) {
        setList('')
    }

    return (
        <>
        {stock.symbol.startsWith(search.toUpperCase()) &&
        <div className='search-res'>

            <NavLink className='make-greenshow text' exact to={`/stocks/${stock.id}` }>{stock.symbol}</NavLink>

            <NavLink className='make-greenshow text' exact to={`/stocks/${stock.id}` }>{stock.name}</NavLink>
        </div>
        }

        </>
    )

}
