import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import CreateList from "../Modals/CreateList";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteWatchlist, fetchPortfolio } from '../../store/user';
import UserContextHook from '../../context/UserContext';

export default function WatchlistComponent() {
    const { user } = useSelector(state => state)
    const sessionUser = useSelector(state => state.session.user);

    const { clicked, setClicked } = UserContextHook()

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
    const editList = (id) => {
        if (clicked === id) {
            setClicked(null);
        } else {
            setClicked(id);
        }
    };

    const deleteList = () => {
        console.log(clicked);
        dispatch(deleteWatchlist(clicked))
    }


    return (
        <div className="portfolio-watchlist">
            <div id="watchlists-header">
                <p>Your Watchlists</p>
                <OpenModalButton
                    buttonText="+"
                    type="create"
                    modalComponent={<CreateList type='create'/>} />
            </div>
            {watchlists.map((list, index) => {

                return (
                    <div className="watchlist" key={`watchlist-index-${index}`}>
                        <NavLink to={`/watchlists/${list.id}`} className="watchlist-left">
                            <span className="watchlist-icon">⚡️</span>
                            <span className="list-name">{list.name}</span>
                        </NavLink>
                        <div>
                            <i className="fa fa-ellipsis-h" onClick={() => editList(list.id)}></i>

                            <span>^</span>
                        </div>
                        <div className={`edit-watchlist ${list.id === clicked ? "watchlist-clicked" : ""}`}>

                            <OpenModalButton buttonText="Edit list" modalComponent={<CreateList type="edit" name={list.name} watchlistId={list.id} />}/>
                            <div className='delete-list' onClick={deleteList}>
                                <i className='fa fa-trash edit-icon'></i>
                                <span>Delete list</span>
                            </div>
                        </div>
                    </div>)

            })}
        </div>
    )
}
