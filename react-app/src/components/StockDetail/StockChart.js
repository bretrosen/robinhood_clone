import React from 'react';
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2';

const StockChart = () => {
    const { stock } = useSelector(state => state.stock)
    const priceArray = stock?.stock_history
    console.log("priceArray from chart ==>", priceArray)

    const prices = []
    for (let i = 0; i < priceArray.length; i++) {
        prices.push(priceArray[i].price)
    }

    // const labels = []
    // for (let i = 1; i <= priceArray.length; i++) {
    //     labels.push(`Day${i}`)
    // }

    const labels = []
    for (let i = priceArray.length - 1; i >= 0; i--) {
        labels.push(priceArray[i].time_stamp)
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: '',
                data: prices.reverse(),
                // backgroundColor: 'rgba(75, 192, 192, 0)',
                borderColor: 'rgba(0,200,5, 1)',
                borderWidth: 1,
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

export default StockChart;
