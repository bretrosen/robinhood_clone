export default function Disclosure() {
    return (
        <div className="discolsure-modal">
            <p id="disclaimers">Disclaimers * &  Notes /</p>
            <p>* Foxtrot is a clone of the website Robinhood created as a group project at App Academy.
            </p>
            <p>* This website does not perform any real transactions.
            </p>
            <p className="creators">/ Created in June 2023 by <a href="https://github.com/bretrosen">Bret Rosen</a>
                <a href="https://github.com/michael-carvajal"> Michael Carvajal</a>
                <a href="https://github.com/snydernb1"> Nick Snyder</a></p>
            <p>/ Our newsletter feature uses an API to fetch data. If there is a server error please refresh the page.</p>
            <p>/ For educational purposes only. Enjoy! </p>
            <span style={{ fontSize: "40px", alignSelf: "flex-end" }} id="stock-emoji">
                📉
            </span>
        </div>
    )
}
