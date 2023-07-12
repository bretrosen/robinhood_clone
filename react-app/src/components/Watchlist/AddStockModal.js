
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addStockToWatchlist, fetchPortfolio } from '../../store/user';
import { useModal } from '../../context/Modal';

export default function AddStockModal({stock}) {
    const { user } = useSelector(state => state)
    const sessionUser = useSelector(state => state.session.user);
    const [checkedLists, setCheckedLists] = useState([]);
    const watchlists = user.watch_lists
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(() => {
        // console.log("right before dispatch");
        dispatch(fetchPortfolio(sessionUser.id))
    }, [dispatch, sessionUser.id])

    if (!watchlists) {
        return (
            <h1>Loading...</h1>
        )
    }

    const toggleCheckedList = (id) => {
        if (checkedLists.includes(id)) {
            setCheckedLists(prevState => prevState.filter(listId => listId !== id));
        } else {
            setCheckedLists(prevState => [...prevState, id]);

        }
    };


    // console.log(stock);
    const saveChanges = () => {
        // console.log(checkedLists);
        dispatch(addStockToWatchlist(checkedLists, stock.id))
        closeModal()
    }
    return (
        <div className="portfolio-watchlist lists-modal">
            <div className='list-modal-title'>
                <div className='watchlist-lrg'>
                    Add {stock.name} to your list
                </div>
                <i className='fa fa-times' id='close-create-list' onClick={closeModal}></i>
            </div>

            <div className='all-watchlists-modal'>
                <div className='create-new-list'>
                    <span>+</span> <span className='watchlist-med'>Add to List</span>
                </div>

                {watchlists.map((list, index) => {
                    const isChecked = checkedLists.includes(list.id);
                    const checkboxClass = `list-checkbox ${isChecked ? 'checked-list' : ''}`;

                    return (
                        <div
                            className="watchlist"
                            key={`watchlist-index-${index}`}
                            id='watchlist-modal'
                            onClick={() => toggleCheckedList(list.id)}
                        >
                            <div className={checkboxClass}>
                                {isChecked && <i className='fa fa-check'></i>}
                            </div>
                            <div className='list-modal'>
                                <p className='watchlist-med'>{list.name}</p>
                                <p className='watchlist-sm' style={{ color: "#eeeeeeae"}}>{list.stocks.length} items</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className='login-signup save-changes' onClick={saveChanges}>Save Changes</p>
        </div>
    );
}
