import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux"
import { stockDetailsThunk } from '../../store/stock';
import { fetchAllHistory } from '../../store/stockHistory';

const LineChart = () => {
    const { user } = useSelector(state => state)
    const {stock} = useSelector(state => state.stock)
    const {history} = useSelector(state => state.history)
    const dispatch = useDispatch()

    // console.log('Is this history from comp?', history)

    useEffect(()=> {
        dispatch(stockDetailsThunk(4))
        dispatch(fetchAllHistory())
    }, [dispatch])


    if (Object.values(stock).length === 0) return false


    const transactionSort = (trans) => {
        let res = {}
        for (let item of trans) {
            if (!res[item.stock_id]) {
                res[item.stock_id] = [item]
            } else {
                res[item.stock_id] = [item, ...res[item.stock_id]]
            }
        }
        return res
    }

    const quantityCalc = (trans) => {
        const stocksArr = Object.keys(trans)
        // console.log('all keys', stocksArr)
        const quantities = {}

        for (let stock of stocksArr) {
            // console.log('this should key into the array', trans[Number(stock)])
            for (let item of trans[Number(stock)]) {
                // console.log('this is the item in the loop', item)
                // console.log('this is the stock in the loop', stock)
                if (!quantities.stock) {
                    if (item.purchased === true) {
                        quantities[stock] = item.quantity
                    } else {
                        quantities[stock] = -item.quantity
                    }
                } else {
                    if (item.purchased === true) {
                        quantities[stock] += item.quantity
                    } else {
                        quantities[stock] -= item.quantity
                    }
                }
            }
        }

        // console.log('did this work right?', quantities)
        return quantities

    }

    const filterHistory = (history, stockIdArr) => {
        // console.log('this should be an arr of keys', stockIdArr)
        const organizedHistory = {};
        const filterStocks = {};
        const historyKeys = Object.keys(history)

        // Sorts history by stock id
        for (let key of historyKeys) {
            // console.log('test',history[key].stock_id)
            if (!organizedHistory[history[key].stock_id]) {
                organizedHistory[history[key].stock_id] = [history[key]]
            } else {
                organizedHistory[history[key].stock_id] = [history[key], ...organizedHistory[history[key].stock_id]]
            }
        }

        // console.log('This should be the sorted histroy by stock', organizedHistory)

        for (let id of stockIdArr) {
            filterStocks[id] = organizedHistory[id]
        }

        // console.log('This should be the filtered stocks', filterStocks)
        return filterStocks

    }

    const findAllStockValue = (user) => {
        const transactions = user.transactions
        const organizedTrans = transactionSort(transactions)
        const stockQuantities = quantityCalc(organizedTrans)
        // console.log('these are the stock quantities',stockQuantities)
        const stockHistory = filterHistory(history, Object.keys(stockQuantities))
        // console.log('StockHistory ==>', stockHistory)

        const stockKeys = Object.keys(stockQuantities)
        const stockVals = [];
        const dates = [];

        for (let key of stockKeys) {
            for (let i in stockHistory[key]) {
                if (key === stockKeys[0]) {
                    stockVals.push(stockHistory[key][i].price * stockQuantities[key])
                    dates.push(stockHistory[key][i].time_stamp)
                } else {
                    let val = stockHistory[key][i].price * stockQuantities[key]
                    stockVals[i] = stockVals[i] + val
                }
            }
        }

        console.log('This should be 91 instances of add stock...',stockVals)
        console.log('This should be 91 instances of dates...',dates)


    }

    const findSingleStockValue = (user, stockId) => {
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


    const findSingleStockDates = (user, stockId) => {
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
        // console.log('Should be all dates', resDateArr)
        return resDateArr
    }


    const vals = findSingleStockValue(user, 4)
    const dates = findSingleStockDates(user, 4)
    const test = findAllStockValue(user)






    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Value',
                data: vals,
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
