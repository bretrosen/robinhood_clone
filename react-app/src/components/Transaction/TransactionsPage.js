import { useSelector } from "react-redux"

export default function TransactionsPage(){
    const {user} = useSelector(state => state)

    return (
        <div>
            TransactionsPage
        </div>
    )
}
