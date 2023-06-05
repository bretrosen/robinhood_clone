import { useState } from "react"

export default function CreateList() {
    const [listName, setListName] = useState("")

    const handleSubmit = () => {
        
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
                    <p className="login-signup">Create List</p>
                </div>
            </form>
        </div>
    )
}
