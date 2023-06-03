import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import "./LandingPage.css"

export default function LandingPage() {
    return (
        <div className="landing-page">
            <header className="landing-header">

                <h1>Earn 4.65% APY on your cash.</h1>
                <h3>Earn more than ever on your uninvested cash, FDIC-insured up to $2 million*. Your first 30 days are free, then it’s just $5 a month.</h3>
                <NavLink to="/login" className='login-signup' id='log-in'>Log in</NavLink>
                <p>Cash sweep disclosures</p>
                <p>*Terms apply. Rate subject change.</p>
            </header>
        </div>
    )
}
