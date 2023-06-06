import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchAddBuyPower } from "../../store/user";



function TransfersModal() {
	const dispatch = useDispatch();
	const [buyingPower, setBuyingPower] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

        const addedAmount = {
            userId: sessionUser.id,
            amount: Number(buyingPower)
        }

        console.log('from the component', addedAmount)
		const data = await dispatch(fetchAddBuyPower(addedAmount));
		if (data) {
			setErrors(data);
		} else {
			closeModal();
		}
	};

	return (
		<>
			<h1>Transfer</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					From
					<select>
						<option>Investor Checking</option>
						<option>Investor Savings</option>
                    </select>
				</label>
				<label>
					To
					<select disabled>
						<option>Foxtrot</option>


                    </select>
				</label>

				<label>
					Amount
					<input
						type="number"
						value={buyingPower}
						onChange={(e) => setBuyingPower(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Transfer Funds</button>
			</form>
		</>
	);
}

export default TransfersModal;
