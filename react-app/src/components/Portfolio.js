import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPortfolio } from "../store/user";

export default function Portfolio() {
    const { user } = useSelector(state => state)
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPortfolio(sessionUser.id))
    }, [dispatch])
    return (
        <div className="portfolio-page">
            <h1>Portfolio</h1>
        </div>
    )
}
