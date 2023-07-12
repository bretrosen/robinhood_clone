import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import Disclosure from "../Modals/Disclosure";

export default function Footer() {
    return (
        <footer>
            <div>
                <p className="footer-headings">About</p>
                <div className="footer-links">
                    <p>Clone of the website <a target="_blank" href="https://robinhood.com/" id="robin-hood-link">Robinhood</a></p>
                    <OpenModalButton type={"legal"} modalComponent={<Disclosure />}/>
                </div>
            </div>
            <div>
                <p className="footer-headings">Github</p>
                <div className="footer-links">
                    <a target="_blank" href="https://github.com/bretrosen">Bret's Github</a>
                    <a target="_blank" href="https://github.com/michael-carvajal">Michael's Github</a>
                    <a target="_blank" href="https://github.com/snydernb1">Nick's Github</a>

                </div>
            </div>
            <div>
                <p className="footer-headings">Linkin</p>
                <div className="footer-links">
                    <a target="_blank" href="https://www.linkedin.com/in/bret-rosen-147a281b7/">Bret's Linkedin</a>
                    <a target="_blank" href="https://www.linkedin.com/in/michael-carvajal-326683203/">Michael's Linkedin</a>
                    <a target="_blank" href="https://www.linkedin.com/in/nicholas-snyder-2714a5a1/">Nick's Linkedin</a>

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
                    <img src='/fox-logo.png' id="fox-footer" alt="foxtrot logo"></img>
                </NavLink>

            </div>
        </footer>
    )
}
