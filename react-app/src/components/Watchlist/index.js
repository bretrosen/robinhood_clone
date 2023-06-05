export default function Watchlist() {
    return (
        <div className="portfolio-page">

            <table>
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
                    <tr>
                        <td>Company A</td>
                        <td>ABC</td>
                        <td>$10.00</td>
                        <td>+2.5%</td>
                        <td>$1 billion</td>
                    </tr>
                    <tr>
                        <td>Company B</td>
                        <td>DEF</td>
                        <td>$20.50</td>
                        <td>-1.2%</td>
                        <td>$500 million</td>
                    </tr>
                    <tr>
                        <td>Company C</td>
                        <td>GHI</td>
                        <td>$15.75</td>
                        <td>+0.8%</td>
                        <td>$750 million</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
