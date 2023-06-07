import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import "./LandingPage.css"

export default function LandingPage() {
    return (
        <div className="landing-page">
            <header className="landing-header">

                <h1>Earn 4.65% APY on your cash.</h1>
                <h3 style={{ textAlign: "center" }}>Earn more than ever on your uninvested cash, FDIC-insured up to $2 million*. Your first 30 days are free, then it’s just $5 a month.</h3>
                <NavLink to="/login" className='login-signup' id='log-in'>Log in</NavLink>
                <p>Cash sweep disclosures</p>
                <p>*Terms apply. Rate subject change.</p>
            </header>
            <div className="free-stock">
                <p>Get your first stock free. <span className="forgot-info">Limitations Apply</span></p>
            </div>
            <div className="build-portfolio">
                <div className="build-portfolio-top">

                    <img src="/static/cellphone.png" alt="cellphone surrounded by 3d shapes" style={{width : "50%"}}></img>
                    <div className="build-right">
                        <h1 className="huge-font">Investing<br />
                            Build your <br />portfolio starting with just $1
                        </h1>
                        <p style={{fontSize: "18px"}}>Invest in stocks, options, and ETFs at your pace and commission-free.</p>
                        <p style={{ fontSize: "15px" }}><i className="fa fa-info-circle"></i>Investing Disclosures</p>
                        <NavLink to="/signup" className="login-signup" id="landing-info" >Learn more</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
