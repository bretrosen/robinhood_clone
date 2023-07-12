import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import Disclosure from "../Modals/Disclosure";

export default function Footer() {
    return (
        <footer>
            <div>
                <p className="footer-headings">About</p>
                <div className="footer-links">
                    <p>
                        Clone of the website{" "}
                        <a
                            href="https://robinhood.com/"
                            id="robin-hood-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Robinhood
                        </a>
                    </p>
                    <OpenModalButton
                        type={"legal"}
                        modalComponent={<Disclosure />}
                    />
                </div>
            </div>
            <div>
                <p className="footer-headings">Github</p>
                <div className="footer-links">
                    <a
                        href="https://github.com/bretrosen"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Bret's Github
                    </a>
                    <a
                        href="https://github.com/michael-carvajal"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Michael's Github
                    </a>
                    <a
                        href="https://github.com/snydernb1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Nick's Github
                    </a>
                </div>
            </div>
            <div>
                <p className="footer-headings">Linkin</p>
                <div className="footer-links">
                    <a
                        href="https://www.linkedin.com/in/bret-rosen-147a281b7/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Bret's Linkedin
                    </a>
                    <a
                        href="https://www.linkedin.com/in/michael-carvajal-326683203/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Michael's Linkedin
                    </a>
                    <a
                        href="https://www.linkedin.com/in/nicholas-snyder-2714a5a1/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Nick's Linkedin
                    </a>
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
            <div className="footer-divider"></div>
            <div>
                <NavLink exact to="/">
                    <p id="footer-logo">FOXTROT</p>
                    <img src="/fox-logo.png" id="fox-footer" alt="foxtrot logo" />
                </NavLink>
            </div>
        </footer>
    );
}
