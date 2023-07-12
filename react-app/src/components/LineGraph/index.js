import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux"
import './linegraph.css'



const LineChart = ({dates, vals}) => {
    // console.log('valData', data)



    const {stock} = useSelector(state => state.stock)
    const {history} = useSelector(state => state.history)

    const [dateData, setDateData] = useState([])
    const [valData, setValData] = useState([])
    const [days, setdays] = useState(30)


    useEffect(() => {
        setDateData(dates.slice(61,91))
        setValData(vals.slice(61,91))
    }, [vals])

    // Could be a future feature to show growth of a single stock owned by the user, would need some work
    // This was the first draft of the user portfolio graph function
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


    // Could be a future feature to show growth of a single stock owned by the user, would need some work
    // This was the first draft of the user portfolio graph function
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


    // const vals = findSingleStockValue(user, 4)
    // const dates = findSingleStockDates(user, 4)



    const oneMonth = () => {
        setDateData(dates.slice(61,91))
        setValData(vals.slice(61,91))
        setdays(30)
    }
    const twoMonth = () => {
        setDateData(dates.slice(31,91))
        setValData(vals.slice(31,91))
        setdays(60)
    }
    const threeMonth = () => {
        setDateData(dates.slice(0,91))
        setValData(vals.slice(0,91))
        setdays(90)
    }


    const data = {
        labels: dateData,
        datasets: [
            {
                label: 'Value',
                data: valData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: valData[0] < valData[valData.length - 1] ? 'green' : 'red',
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
                // ticks: {
                //     display: false
                // },
                beginAtZero: false,
                grid: {
                    drawBorder: false,
                    display: false
                }
            },
            x: {
                ticks: {
                    display: false
                },
                grid: {
                    drawBorder: false,
                    display: false
                }
            }
        },
    };

    let oldestPrice = valData[0]
    let newestPrice = valData[valData.length - 1]


    const priceDiff = valData[valData.length - 1] - valData[0];
    let performanceClassName;

    if (priceDiff >= 0) {
        performanceClassName = 'stock-positive';
    } else {
        performanceClassName = 'stock-negative';
    }

    // console.log('newest pirce?', newestPrice)

    return (
        <div>
            {
                newestPrice === undefined ?

                <div>
                    {/* $0 (0%)
                    &nbsp;Past&nbsp;{days} days */}
                </div>

                :
                <div className={performanceClassName}>
                ${(newestPrice - oldestPrice)?.toLocaleString(undefined, {    minimumFractionDigits: 2,
    maximumFractionDigits: 2,})}
                &nbsp;
                ({(((newestPrice - oldestPrice) / oldestPrice) * 100).toFixed(2)}%)


                &nbsp;Past&nbsp;{days} days
            </div>
            }

            <Line data={data} options={options} className='graph'/>
            <div className='portfolio-view-buttons'>
                <button className='toggle-view' onClick={oneMonth}>30 Day View</button>
                <button className='toggle-view' onClick={twoMonth}>60 Day View</button>
                <button className='toggle-view' onClick={threeMonth}>90 Day View</button>
            </div>

        </div>
    );
};

export default LineChart;
