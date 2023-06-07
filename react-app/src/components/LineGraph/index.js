import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux"
import { stockDetailsThunk } from '../../store/stock';

const LineChart = () => {
    const { user } = useSelector(state => state)
    const {stock} = useSelector(state => state.stock)
    const dispatch = useDispatch()

    console.log('Is this apple?', stock.stock_history)

    useEffect(()=> {
        dispatch(stockDetailsThunk(1))
    }, [dispatch])

    const findStockAmount = (user, stockId) => {
        const transactions = user.transactions
        let resStockTransactions = []
        let totalQuantity = 0
        let earliestDate = 0;
        let initialValue = 0;
        const stockValArr = [];
        const stockDateArr = [];

        // Sorting through users transactions and filtering down to a single stock
        for (let stock of transactions) {
            if (stock.stock_id === stockId) {
                resStockTransactions.push(stock)
            }
        }
        // From the filtered list, calulating earliest date, total quantity of stock and initial value
        for (let item of resStockTransactions) {
            if (item.purchased === true) {
                totalQuantity += item.quantity
                initialValue += item.quantity * item.price_purchased
            } else {
                totalQuantity -= item.quantity
                initialValue -= item.quantity * item.price_sold
            }

            let date = Date.parse(item.time_stamp)
            if (earliestDate === 0) {
                earliestDate = date
            } else if (date < earliestDate) {
                earliestDate = date
            }
        }

        stockValArr.push(initialValue)
        stockDateArr.push(earliestDate)
        console.log('Is the quantity calculating?', totalQuantity)
        console.log('Is the initial value calculating?', initialValue)
        console.log('Is the earliest date calculating?', earliestDate)



    }

    findStockAmount(user, 1)






    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Data 1',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Line Chart Example</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
