import React, { useContext, useState } from "react"

const UserContext = React.createContext()

export function UserContextProvider({children}) {
    const [clicked, setClicked] = useState(null)

    return (
        <UserContext.Provider value={{clicked, setClicked}}>
            {children}
        </UserContext.Provider>
    )
}

const UserContextHook = () => useContext(UserContext)
export default UserContextHook
