import { useState } from "react"
import { useDispatch } from "react-redux";
import { postWatchlist, putWatchlist } from "../../store/user";
import { useModal } from "../../context/Modal"
import UserContextHook from "../../context/UserContext";
export default function CreateList({ type, name, watchlistId }) {
    const [listName, setListName] = useState(name ? name : "")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();
    const {setClicked} = UserContextHook()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = {}
        // console.log('hello world');
        if (listName.length === 0) {

            newErrors.length = "List name cannot be empty"
        }

        if (listName.length > 50) {
            newErrors.length = "List name must be less than 50 characters"

        }
        // console.log(newErrors);
        // console.log(errors);
        if (Object.values(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        dispatch(postWatchlist(listName))
        closeModal()
        setListName("")
    }
    const editList = (e) => {
        e.preventDefault()
        const id = watchlistId
        dispatch(putWatchlist(listName, id))
        closeModal()
        setListName("")
        setClicked("")
    }
    return (
        <div className="create-list-container">
            {errors.length && <p>{errors.length}</p>}
            <div id="create-list">
                {type === "create" ? <p style={{fontWeight: "500"}}>Create list</p> : <p style={{fontWeight: "500"}}>Edit list</p>}
                <p onClick={closeModal}><i className="fa fa-times"></i></p>
            </div>
            <form onSubmit={type === "create" ? handleSubmit : (e) => editList(e)}>
                <div className="list-input">
                    <p>⚡️</p>
                    <input placeholder="List Name"
                        value={listName}
                        onChange={e => setListName(e.target.value)}
                    />

                </div>
                <div className="list-btns">
                    <p className="login-signup watchlist-sm" id="list-cancel" onClick={closeModal}>Cancel</p>

                    {type === "edit" && <p className="login-signup save-changes watchlist-sm" onClick={(e) => editList(e)}>Edit List</p>}
                    {type === "create" && <p className="login-signup save-changes watchlist-sm" onClick={handleSubmit}>Create List</p>}
                </div>
            </form>
        </div>
    )
}
