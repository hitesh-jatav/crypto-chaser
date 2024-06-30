import React from 'react'

const Banner = ({ currencies = [] }) => {

    function convertToINRCurrency(numberStr) {
        const number = parseFloat(numberStr);
        if (isNaN(number)) {
            throw new Error('Invalid number string');
        }
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
    }

    return (
        <div className='banner-wrapper mb-5 px-5'>
            <div className=''>
                <div className='d-flex align-items-center'>
                <h1 className='text-gold px-3'>Cryto Chaser</h1>
                <span>Chase your digital currency</span>
                </div>

                <div className='d-flex banner-container m-5'>
                    {
                        currencies.map((currency) => <div className='banner-content justify-content-center border p-4 m-2'
                            key={currency.id}>
                            <img src={currency.image} width={150} height={150} />

                            <p>{currency.name}</p>
                            <p className={currency.price_change_percentage_24h_in_currency < 0 ? 'text-danger' : 'text-success'}>
                                {convertToINRCurrency(currency.price_change_percentage_24h_in_currency)}
                            </p>
                            <p>
                                {convertToINRCurrency(currency.current_price)}
                            </p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Banner