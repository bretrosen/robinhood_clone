import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";



function TransfersModal() {
	const dispatch = useDispatch();
	const [buyingPower, setBuyingPower] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

			const data = await dispatch();
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
