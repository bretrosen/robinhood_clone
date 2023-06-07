import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchAddBuyPower } from "../../store/user";
import './TransfersModal.css'


function TransfersModal() {
	const dispatch = useDispatch();
	const [buyingPower, setBuyingPower] = useState("");
	const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false)
	const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        const errors = {}
        if (buyingPower < 1) errors.buyingPower = "Minimum of $1.00 is required"
        if (!Number(buyingPower)) errors.buyingPower = "Amount must be a number"
        setErrors(errors)
    }, [buyingPower]);


	const handleSubmit = async (e) => {
		e.preventDefault();
        setSubmit(true);

        if (Object.values(errors).length === 0) {
            const buying_power = buyingPower
            const userId = sessionUser.id

            const data = await dispatch(fetchAddBuyPower(buying_power, userId));

            closeModal();
        }
	};

    let makeDisabled = false;


    if (buyingPower.length) {
      makeDisabled = true
    }

	return (
		<section className="transfer-modal">
			<h3 id="transfer-title">Transfer</h3>
			<form onSubmit={handleSubmit} className="transfer-form">
            {submit && errors.buyingPower && (
                <div className="createTransferErrors">* {errors.buyingPower}</div>
                )}

                <div className="transfer-form-field">
                    <label>
                        From
                    </label>
					<select  className="transfer-input">
						<option>Investor Checking</option>
						<option>Investor Savings</option>
                    </select>
                </div>

                <div className="transfer-form-field">
                    <label>
                        To
                    </label>
                    <select disabled  className="transfer-input">
                        <option>Foxtrot</option>
                    </select>
                </div>

                <div className="transfer-form-field">
				    <label>
					Amount
                    </label>
					<input
                        className="transfer-input"
						value={buyingPower}
						onChange={(e) => setBuyingPower(e.target.value)}
						required
					/>
                </div>

                <button
                type="submit"
                disabled={!makeDisabled}
                id='createSpotButton'
                className={makeDisabled === false ? "loginButtonDisabled" : "loginButton"}
                >
                Transfer Funds
                </button>

			</form>
		</section>
	);
}

export default TransfersModal;
