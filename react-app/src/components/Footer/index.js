import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function Footer() {
    return (
        <footer>
            <div>
                <p className="footer-headings">About</p>
                <div className="footer-links">
                    <p>Clone of the website <a href="https://robinhood.com/" id="robin-hood-link">Robinhood</a></p>
                </div>
            </div>
            <div>
                <p className="footer-headings">Github</p>
                <div className="footer-links">
                    <a href="#">Bret's Github</a>
                    <a href="#">Michaels's Github</a>
                    <a href="#">Nick's Github</a>

                </div>
            </div>
            <div>
                <p className="footer-headings">Linkin</p>
                <div className="footer-links">
                    <a href="#">Bret's Linkedin</a>
                    <a href="#">Michaels's Linkedin</a>
                    <a href="#">Nick's Linkedin</a>

                </div>
            </div>
            <div>
                <p className="footer-headings">Technologies</p>
                <div className="footer-links">
                    <p>Javascript/React</p>
                    <p>Python/Flask</p>
                    <p>HTML5/CSS</p>
                </div>
            </div>
            < div className="footer-divider">
            </div>
            <div>
                <NavLink exact to="/" >
                    <p id='footer-logo'>FOXTROT</p>
                    <img src='/fox-logo.png' id="fox-footer"></img>
                </NavLink>

            </div>
        </footer>
    )
}
