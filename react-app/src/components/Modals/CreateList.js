import { useState } from "react"
import { useDispatch } from "react-redux";
import { postWatchlist } from "../../store/user";
import { useModal } from "../../context/Modal"
export default function CreateList({type, name}) {
    const [listName, setListName] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();
    const dispatch = useDispatch()
    const handleSubmit = () => {
        const newErrors = {}
        console.log('hello world');
        if (listName.length === 0) {
            console.log("listname is -====== to 0");
            newErrors.length = "List name cannot be empty"
        }

        if (listName.length > 50) {
            newErrors.length = "List name must be less than 50 characters"

        }
        console.log(newErrors);
        console.log(errors);
        if (Object.values(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        dispatch(postWatchlist(listName))
        closeModal()
        setListName("")
    }
    console.log(type);
    return (
        <div>
            {errors.length && <p>{errors.length}</p>}
            <div id="create-list">
                {type === "create" ? <p>Create list</p> : <p>Edit list</p>}
                <p onClick={closeModal}>x</p>
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
                    <p className="login-signup" onClick={closeModal}>Cancel</p>
                    <p className="login-signup" onClick={handleSubmit}>Create List</p>
                </div>
            </form>
        </div>
    )
}
