import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'


const DailyStockChart = () => {
    const [auto, setAuto] = useState(false)
    const { stock } = useSelector(state => state.stock)
    const priceHistory = stock?.stock_history
    const lastPrice = priceHistory[0].price.toFixed(2)
    const dailyPrices = [Number(lastPrice)]
    const labels = [1]
    let count = 2;

    const toggleAuto = () => {
        setAuto(!auto)
    }

    const getDelta = async () => {
        const response = await fetch(`/api/stocks/get_price`)
        const delta = await response.json()
        console.log("price delta from fetch", delta)
        console.log("delta is of type =>", typeof delta)
        console.log("last price is of type =>", typeof lastPrice)

        const newPrice = Number(dailyPrices[dailyPrices.length - 1]) + delta
        console.log("new price in daily chart", newPrice)
        dailyPrices.push(newPrice)
        labels.push(count)
        count++
        console.log("price array", dailyPrices)
        console.log("labels array", labels)

    }

    useEffect(() => {
        console.log("use effect in daily stock chart ran")
        const timer1 = setInterval(() => getDelta(), 10000)
        const timer2 = setInterval(() => toggleAuto(), 10000)
        const cancelIntervals = () => {
            clearInterval(timer1)
            clearInterval(timer2)
        }
        return () => cancelIntervals()
    }, [auto])

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Stock Price',
                data: dailyPrices,
                borderColor: 'rgba(0,200,5, 1)',
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                ticks: {
                    display: false
                },
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

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}

export default DailyStockChart;
