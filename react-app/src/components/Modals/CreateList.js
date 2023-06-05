import { useState } from "react"
import { useDispatch } from "react-redux";
import { postWatchlist } from "../../store/user";
import { useModal } from "../../context/Modal"
export default function CreateList() {
    const [listName, setListName] = useState("")
    const { closeModal } = useModal();
    const dispatch = useDispatch()
    const handleSubmit = () => {
        console.log('hello world');
        dispatch(postWatchlist(listName))
        closeModal()
        setListName("")
    }
    return (
        <div>
            <div id="create-list">
                <p>Create list</p>
                <p>x</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                <p>⚡️</p>
                    <input placeholder="List Name"
                        value={listName}
                        onChange={e => setListName(e.target.value)}
                    />

                </div>
                <div>
                    <p className="login-signup">Cancel</p>
                    <p className="login-signup" onClick={handleSubmit}>Create List</p>
                </div>
            </form>
        </div>
    )
}
