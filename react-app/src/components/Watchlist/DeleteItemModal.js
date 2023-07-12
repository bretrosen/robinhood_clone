import { useModal } from "../../context/Modal";

export default function DeleteItemModal({stockId, watchlistId, name, deleteStock}) {
    console.log(stockId, watchlistId, name);
    const {closeModal} = useModal()
    return (
        <div className="create-list-container">
            <h2>Are you sure you want to remove '{name}'?</h2>
            <div class="list-btns"><p class="login-signup watchlist-sm" id="list-cancel" onClick={closeModal}>Cancel</p>
                <p class="login-signup save-changes watchlist-sm" id="delete-item" onClick={(e => deleteStock(stockId, watchlistId, e))}>Delete Item</p></div>
        </div>
    )
}
