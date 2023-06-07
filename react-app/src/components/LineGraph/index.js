import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux"
import { stockDetailsThunk } from '../../store/stock';

const LineChart = () => {
    const { user } = useSelector(state => state)
    const {stock} = useSelector(state => state.stock)
    const dispatch = useDispatch()

    // console.log('Is this apple?', stock.stock_history)

    useEffect(()=> {
        dispatch(stockDetailsThunk(1))
    }, [dispatch])

    // console.log('what is stock', Object.values(stock))
    if (Object.values(stock).length === 0) return false

    const findStockValue = (user, stockId) => {
        const transactions = user.transactions
        let filterStockTransactions = []
        let totalQuantity = 0;
        let initialValue = 0;
        let earliestDate = 0;
        const stockValArr = [];


        let filterHistory = [];

        // Sorting through users transactions and filtering down to a single stock
        for (let stock of transactions) {
            if (stock.stock_id === stockId) {
                filterStockTransactions.push(stock)
            }
        }
        // From the filtered list, calulating earliest date, total quantity of stock and initial value
        for (let item of filterStockTransactions) {
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
        // console.log('Is the quantity calculating?', totalQuantity)
        // console.log('Is the initial value calculating?', initialValue)
        // console.log('Is the earliest date calculating?', earliestDate)

        // Filters stock history to items after users initial buy date
        for (let item of stock.stock_history) {
            let date = Date.parse(item.time_stamp)
            if (date > earliestDate) {
                filterHistory.push(item)
            }
        }

        for (let i = filterHistory.length - 1; i >= 0; i--) {
            let item = filterHistory[i]
            stockValArr.push(totalQuantity * item?.price)
        }

        // console.log('This should be filtered history', filterHistory)
        // console.log('This should be stock value array', stockValArr)
        return stockValArr

    }

    const findStockDates = (user, stockId) => {
        const transactions = user.transactions
        let filterStockTransactions = []
        let earliestDate = 0;
        const stockDateArr = [];

        let filterHistory = [];

        // Sorting through users transactions and filtering down to a single stock
        for (let stock of transactions) {
            if (stock.stock_id === stockId) {
                filterStockTransactions.push(stock)
            }
        }
        // From the filtered list, calulating earliest date, total quantity of stock and initial value
        for (let item of filterStockTransactions) {
            let date = Date.parse(item.time_stamp)
            if (earliestDate === 0) {
                earliestDate = date
            } else if (date < earliestDate) {
                earliestDate = date
            }
        }

        stockDateArr.push(earliestDate)

        // Filters stock history to items after users initial buy date
        for (let item of stock.stock_history) {
            let date = Date.parse(item.time_stamp)
            if (date > earliestDate) {
                filterHistory.push(item)
            }
        }

        for (let i = filterHistory.length - 1; i >= 0; i--) {
            let item = filterHistory[i]
            stockDateArr.push(Date.parse(item?.time_stamp))
        }

        let resDateArr = [];

        for (let date of stockDateArr) {
            let dateFormat = new Date(date)
            resDateArr.push(dateFormat.getDate() + '/' + dateFormat.getMonth() + '/' + dateFormat.getFullYear())
        }
        console.log('Should be all dates', resDateArr)
        return resDateArr
    }


    const vals = findStockValue(user, 1)
    const dates = findStockDates(user, 1)






    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Value',
                data: findStockValue(user, 1),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: vals[0] < vals[vals.length - 1] ? 'green' : 'red',
                borderWidth: 1,
            }
        ],
    };

    const options = {
        plugins: {
            legend: {display: false},
            tooltip: {intersect: true}
        },
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
