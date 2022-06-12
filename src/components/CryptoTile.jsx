import React from 'react'

const CryptoTile = ({data, selectedTile, onClick}) => {

    const {name, rate, icon} = data

    const handeClick = () => onClick(data)

    return (
        <div className={`card ${selectedTile && 'selected'}`} onClick={handeClick}>
            <div card-body>
                <img className="coin-icon" src={icon} alt="icon" />
                <div>{name}</div>
                <div>{rate}</div>
            </div>
        </div>
    )
}

export default CryptoTile