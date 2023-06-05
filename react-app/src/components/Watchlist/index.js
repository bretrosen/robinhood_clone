import WatchlistComponent from "./WatchlistComponent";
import './watchlist.css'
export default function WatchlistList() {
    return (
        <div className="portfolio-page">

                <table id="watchlist-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>Today</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-row">
                            <td>Company A</td>
                            <td>$10.00</td>
                            <td>$10.00</td>
                            <td>+2.5%</td>
                            <td>$1 billion</td>
                        </tr>
                        <tr className="table-row">
                            <td>Company B</td>
                            <td>$20.50</td>
                            <td>$20.50</td>
                            <td>-1.2%</td>
                            <td>$500 million</td>
                        </tr>
                        <tr className="table-row">
                            <td>Company C</td>
                            <td>$15.75</td>
                            <td>$15.75</td>
                            <td>+0.8%</td>
                            <td>$750 million</td>
                        </tr>
                    </tbody>
                </table>
            <WatchlistComponent />
        </div>
    )
}
