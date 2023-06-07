import { NavLink } from 'react-router-dom';

export default function StockList ({stock, search, setSearch, setSymbol, setName}) {

    if (stock.symbol.startsWith(search.toUpperCase())) {
        setSymbol(stock.symbol)
    }

    if (stock.name.toLowerCase().startsWith(search.toLowerCase())) {
        setName(stock.name)
    }

    if (search.length === 0) {
        setSymbol('')
        setName('')
    }

    const closeMenu = () => setSearch("");

    return (
        <>
        {(stock.symbol.startsWith(search.toUpperCase()) ||
        stock.name.toLowerCase().startsWith(search.toLowerCase()))
        &&
        <div className='search-res'>

            <NavLink className='make-greenshow res-text' exact to={`/stocks/${stock.id}`} onClick={closeMenu}>{stock.symbol}</NavLink>

            <NavLink className='make-greenshow res-text' exact to={`/stocks/${stock.id}`} onClick={closeMenu}>{stock.name}</NavLink>
        </div>
        }

        </>
    )

}
