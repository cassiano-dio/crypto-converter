import React from 'react'

const Transactions = ({list}) => {
    return(
        <div>
            <h4>Lista de transações</h4>
            {
                list.length ? list.map(
                    (item) =>(
                        <div key={item.id}>
                            <span ><strong>{item.name}</strong></span>
                            {':'}
                            <span>{item.converted}</span>
                        </div>
                    )
                ):(
                    <div>
                        <h4>Lista de transações vazia</h4>
                    </div>
                )
            }
        </div>
    )
}

export default Transactions