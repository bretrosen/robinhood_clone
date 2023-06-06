import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import CreateList from "../Modals/CreateList";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPortfolio } from '../../store/user';

export default function WatchlistComponent() {
    const { user } = useSelector(state => state)
    const sessionUser = useSelector(state => state.session.user);
    // console.log(sessionUser);
    const watchlists = user.watch_lists
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("right before dispacth");
        dispatch(fetchPortfolio(sessionUser.id))
    }, [dispatch, sessionUser.id])

    if (!watchlists) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className="portfolio-watchlist">
            <div id="watchlists-header">
                <p>Lists</p>
                <OpenModalButton
                    buttonText="+"
                    modalComponent={<CreateList />} />
            </div>
            {watchlists.map((list, index) => {

                return (
                    <div className="watchlist" key={`watchlist-index-${index}`}>
                        <NavLink to={`/watchlists/${list.id}`} className="watchlist-left">
                            <span className="watchlist-icon">⚡️</span>
                            <span className="list-name">{list.name}</span>
                        </NavLink>
                        <div>
                            <i className="fa fa-ellipsis-h"></i>
                            <span>^</span>
                        </div>
                    </div>)

            })}
        </div>
    )
}
