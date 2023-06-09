
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPortfolio } from "../../store/user";
import { fetchAllHistory } from '../../store/stockHistory';


import "./portfolio.css"
import LineChart from "../LineGraph";
import WatchlistComponent from "../Watchlist/WatchlistComponent";
import OpenModalButton from "../OpenModalButton";
import TransfersModal from "../Navigation/TransfersModal";

export default function Portfolio() {

    const { user } = useSelector(state => state)
    const {history} = useSelector(state => state.history)
    const sessionUser = useSelector(state => state.session.user);
    // const watchlists = user.watch_lists
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPortfolio(sessionUser.id))
        dispatch(fetchAllHistory())
    }, [dispatch, sessionUser.id])

    if (Object.values(user).length === 1) return false
    if (Object.values(history).length === 0) return false

//============================================Function for calculating portfolio value START


// Takes the user transaction data and filters it to an object with the key as stock id and values as transactions
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

// Iterates through the transaction object and returns a new object with the key as stock id and values at the total quantity of user stock
const quantityCalc = (trans) => {
    const stocksArr = Object.keys(trans)
    // console.log('all trans after buy', trans)
    // console.log('all keys', stocksArr)
    const quantities = {}

    for (let stock of stocksArr) {
        // console.log('this should key into the array', trans[Number(stock)])
        for (let item of trans[Number(stock)]) {
            // console.log('this is the item in the loop', item)
            // console.log('this is the stock in the loop', stock)
            if (!quantities[stock]) {
                // console.log('This should hit multiple times? ===================>', quantities)

                if (item.purchased === true) {
                    quantities[stock] = item.quantity
                } else {
                    quantities[stock] = -item.quantity
                }
            } else {
                // console.log('Are we getting in here? ===================>')
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

// Iterates through all stock history and organizes data in an object by stock id then returns an object of all stock history filtered by user's stocks
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

// Calls all functions above, iterates through the filtered stock history and determines the total stock val (quantity * daily val) of all user's stocks. Returns either an arr or daily values or an array of dates based on the res argument being true/false
const findAllStockValue = (user, res) => {
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
                stockVals.unshift(stockHistory[key][i].price * stockQuantities[key])
                dates.unshift(stockHistory[key][i].time_stamp)
            } else {
                let val = stockHistory[key][i].price * stockQuantities[key]
                stockVals[i] = stockVals[i] + val
            }
        }
    }

    if (res === true) {
        return stockVals
    } else {
        return dates
    }


}

const vals = findAllStockValue(user, true)
const dates = findAllStockValue(user, false)


//============================================Function for calculating portfolio value END

return (
        <div className="portfolio-page" id="only-portfolio">
            <div className="portfolio" id="only-portfolio-">
                <img src="/static/stock-dice.svg" alt="dice with stocks on the sides" style={{ width: "100%" }}></img>
                <h1>Welcome to Foxtrot</h1>

                <div className="portfolio-graph-data">
                    <h2>{user.first_name}'s Portfolio</h2>
                    <h3>${new Intl.NumberFormat('en-IN').format(vals[vals.length - 1].toFixed(2))}</h3>
                    <LineChart dates={dates} vals={vals}/>
                </div>

                <div className="transfer">
                    <div className="transfer-left">

                        <span className="watchlist-med">Unlock your free stock</span>
                        <p className="watchlist-lrg">Add funds to claim your free stock. Limitations apply.</p>
                        <OpenModalButton type="transfer" modalComponent={<TransfersModal />}/>
                    </div>
                    <img src="/static/phone-money.svg" alt="money coming out of phone" id="transfer-img"></img>
                </div>
            </div>
            <WatchlistComponent />
        </div>
    )
}
