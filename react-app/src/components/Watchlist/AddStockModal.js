import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import CreateList from "../Modals/CreateList";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteWatchlist, fetchPortfolio } from '../../store/user';

export default function AddStockModal() {
    const { user } = useSelector(state => state)
    const sessionUser = useSelector(state => state.session.user);
    const [clicked, setClicked] = useState(null)
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
        <div className="portfolio-watchlist lists-modal">
            <div className='list-modal-title'>
                <div>
                    Add google to your list
                </div>
                <div class="close-modal">×</div>
            </div>

            <div className='all-watchlists-modal'>
                <div className='create-new-list'>
                    <span>+</span> <span className='watchlist-med'>Add to List</span>
                </div>

                {watchlists.map((list, index) => {

                    return (
                        <div className="watchlist" key={`watchlist-index-${index}`} id='watchlist-modal'>
                            <div className='list-checkbox checked-list'>
                                <i className='fa fa-check'></i>
                            </div>
                            <div className='list-modal'>
                                <p className='watchlist-med'>{list.name}</p>
                                <p className='watchlist-sm'>{watchlists.length} items</p>
                            </div>
                        </div>
                    )

                })}
            </div>
            <p className='login-signup save-changes'>Save Changes</p>
        </div>
    )
}
