import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'


const DailyStockChart = () => {
    const { stock } = useSelector(state => state.stock)
    const priceHistory = stock?.stock_history
    const lastPrice = priceHistory[0].price.toFixed(2)
    const [dailyPrices, setDailyPrices] = useState([Number(lastPrice)])
    const [labels, setLabels] = useState([])
    let count = 1

    const getDelta = async () => {
        const response = await fetch(`/api/stocks/get_price`)
        const delta = await response.json()
        const newPrice = Number(dailyPrices[dailyPrices.length - 1]) + delta
        console.log("new price in daily chart", newPrice)
        setDailyPrices(dailyPrices => [...dailyPrices, newPrice])
        setLabels(labels => [...labels, count])
        count++
        console.log("price array", dailyPrices)

    }

    useEffect(() => {
        console.log("use effect in daily stock chart ran")
        const timer = setInterval(() => getDelta(), 5000)
        return () => clearInterval(timer)
    }, [dailyPrices])

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

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}

export default DailyStockChart;
