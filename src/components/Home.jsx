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

    /**
     * O problema acontece aqui nessa parte:
     * Quando eu inicio o projeto pela primeira vez os valores são carregados normalmente da API, mas quando atualiza a opagina não carrega
     * mais os dados.
     * 
     * Também não achei legal essa forma de carregar os valores iniciais das criptomoedas, acho meio "gambiarra"
     * Aceito sujestões de melhorias.
     */


    //const dataset  = useFetchData("https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl");
    const [ratesArray, setRatesArray] = React.useState({});


    //Consome dados da API do Coingecko com os valores de várias criptomoedas
    useEffect(() => {
        Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl')
        .then((response) => {
           
            setRatesArray(response);
            
        });
    },[]);

    //console.log(dataset.data)

    console.log({ratesArray})
    

    //Carrega inicia com um vetor de criptomoedas com seus respectivos simbolos e valores capturados da API
    const tiles = [
        {id:1, icon:btc, name:"BTC", rate: 140000},
        {id:2, icon:eth, name:"ETH", rate: 8000},
        {id:3, icon:ltc, name:"LTC", rate: 300},
        // {id:1, icon:btc, name:"BTC", rate: ratesArray.data[0].current_price},
        // {id:2, icon:eth, name:"ETH", rate: ratesArray.data[1].current_price},
        // {id:3, icon:ltc, name:"LTC", rate: ratesArray.data[21].current_price},
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