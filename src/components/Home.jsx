import React, {useState, useCallback, useEffect} from 'react'
import CryptoTile from './CryptoTile'
import BuyForm from './BuyForm'
import Transactions from './Transactions'
import btc from '../assets/btc.png'
import dash from '../assets/dash.png'
import etc from '../assets/etc.png'
import eth from '../assets/eth.png'
import ltc from '../assets/ltc.png'
import useFetchData from './useFetchData'
import Axios from 'axios'

const Home = () => {

    //const dataset  = useFetchData("https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl");
    const [myArray, setMyArray] = React.useState({});

    useEffect(() => {
        Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl')
        .then((response) => {
           
                setMyArray(response);
            
        });
    }, []);

    //console.log(dataset.data)

    console.log(myArray)
    

    const tiles = [
        // {id:1, icon:btc, name:"BTC", rate: dataset.data[0].current_price},
        // {id:2, icon:eth, name:"ETH", rate: dataset.data[1].current_price},
        // {id:3, icon:ltc, name:"LTC", rate: dataset.data[20].current_price},
        {id:1, icon:btc, name:"BTC", rate: myArray.data[0].current_price},
        {id:2, icon:eth, name:"ETH", rate: myArray.data[1].current_price},
        {id:3, icon:ltc, name:"LTC", rate: myArray.data[21].current_price},
    ]

    const [selectedTile, setSelectedTile] = useState(tiles[0])
    const [list, setList] = useState([])

    const handleSelect = (data) => {
        setSelectedTile(data)
    }

    const buildList = (list) => {

        setList(list)

    }
    return ( 
        <div>
            <div>
                <div>
                    <div>
                        {
                            tiles.map(
                                (coin) => (
                                    <CryptoTile 
                                        key={coin.id} 
                                        data={coin}  
                                        onClick={handleSelect}
                                        selectedTile={coin.id === selectedTile.id}
                                    />
                                )
                            )
                        }
                    </div>
                </div>
                <BuyForm data={selectedTile} onPurchase={buildList}/>
                <div>
                    <Transactions list={list}/>
                </div>
            </div>
        </div>
    )

}

export default Home