import React, {useState, useEffect, useCallback} from 'react'
import InputBase from './InputBase'
import styled from 'styled-components'

const InputButton = styled.input`
    width: 75%;
    margin-top: 20px;
    padding-top: 2.5%;
    padding-bottom: 2.5%;
    border-radius: 5px;
    border: transparent;
    margin: 10px;
    color:dimgray;
    background-color: cadetblue;
`


const BuyForm = ({data, onPurchase}) => {

    const {name, rate } = data
    const init = {amount: "", converted: ""}
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
////////////////////////////////
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
            <div className="buy-form-container">
                
                <h4 >Comprar {name}</h4>
                <InputBase name="amount" label="BRL" onChange={handleChange} className="brl-input"/>
                <InputBase value={exchange.converted} disabled label={name} />
                
                <InputButton type="submit" value="Comprar" className="button-input"/>
            </div>
        </form>
    )

}

export default BuyForm