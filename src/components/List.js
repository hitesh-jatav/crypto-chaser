import React from 'react';
import { Link } from "react-router-dom";


const List = ({ currencies = [] }) => {

    function convertToINRCurrency(numberStr) {
        const number = parseFloat(numberStr);
        if (isNaN(number)) {
            throw new Error('Invalid number string');
        }
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
    }

    return (
        <div className='px-5'>

            <table className="table">
                <thead className=''>
                    <tr className=''>
                        <th scope="col" >Rank</th>
                        <th scope="col" >Coin</th>
                        <th scope="col">Price</th>
                        <th scope="col">24h Change</th>
                        <th scope="col">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currencies.map((currency) => <tr key={currency.id}>
                            <td className='text-white '>{currency.market_cap_rank}</td>

                            <td className='text-white '>
                                <Link to={'/coins/' + currency.id}>
                                    <div className='d-flex align-items-center'>
                                        <img src={currency.image} width={40} height={40} alt={currency.name} />
                                        <div className='d-flex flex-column mx-3 '>
                                            <span className='d-block bold'>
                                                {currency?.symbol.toUpperCase()}
                                            </span>
                                            <span className='color-gray'>
                                                {currency.name}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td className='text-white '>
                                {convertToINRCurrency(currency.current_price)}
                            </td>
                            <td
                                className={currency.price_change_percentage_24h_in_currency < 0 ? 'text-danger' : 'text-success'}
                            >{convertToINRCurrency(currency.price_change_percentage_24h)}</td>
                            <td className='text-white '>{convertToINRCurrency(currency.market_cap)}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default List