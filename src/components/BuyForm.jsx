import React, {useState, useEffect, useCallback} from 'react'
import InputBase from './InputBase'

const BuyForm = ({data, onPurchase}) => {

    const {name, rate } = data
    const init = {amount: 0, converted: 0}
    const [exchange, setExchange] = useState(init)
    const [transactions, setTransactions] = useState([])

    useEffect(() =>{
        
        setExchange({
            ...exchange,
            converted: Number(exchange.amount / rate).toFixed(8)
        })
    }, [name])

    useEffect(
        () => {
            onPurchase(transactions)
        },[transactions]
    )

    const generateId = (prefix) => Math.random().toString(36).replace('0.', prefix || '')

    const handleChange = ({target:{value,name}}) => {
        const val = Number(value.trim())
        const converted = (val/rate).toFixed(8)

        setExchange({
            [name]: value,
            rate:rate,
            converted: converted,
        })
    }   

    const makePurchase = useCallback(
        (event) => {
            event.preventDefault()

            if (!exchange.amount) {
                alert("Informe um valor válido!")
            }

            const payload = {
                ...exchange,
                name,
                id:generateId("txid_")
            }

            setTransactions(
                [...transactions, payload]
            )
        },[exchange, transactions]
    )

    return (
        <form onSubmit={makePurchase}>
            <div>
            <InputBase name="amount" label="BRL" onChange={handleChange} />
                <i className='fa fa-exchange-alt' />
                <InputBase value={exchange.converted}disabled label={name} />
            </div>
            <input type="submit" value="Comprar" />
        </form>
    )

}

export default BuyForm