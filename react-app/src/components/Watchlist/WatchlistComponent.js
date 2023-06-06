import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import CreateList from "../Modals/CreateList";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPortfolio } from '../../store/user';

export default function WatchlistComponent() {
    const { user } = useSelector(state => state)
    const sessionUser = useSelector(state => state.session.user);
    const [clicked, setClicked] = useState(false)
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
    const editList = () => {
        if (!clicked) {
            setClicked(true)
        } else {
            setClicked(false)
        }
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
                            <i className="fa fa-ellipsis-h" onClick={editList}></i>
                            <span>^</span>
                        </div>
                        <div className={`edit-watchlist`} id={clicked ? "watchlist-clicked" : ""}>
                            <div>
                                <i className='fa fa-cog'></i>
                                <span>Edit list</span>
                            </div>
                            <div>
                                <i className='fa fa-cancel'></i>
                                <span>Delete list</span>
                            </div>
                        </div>
                    </div>)

            })}
        </div>
    )
}
