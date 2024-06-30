import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import List from './List'

const Hero = () => {
    const [currencies, setCurrencies] = useState([])
    async function fetchCryptoData() {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h';

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data);
            setCurrencies(data)
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    }

    useEffect(() => {
        fetchCryptoData()
    }, [])


    return (<>
        {currencies.length ?
            <div >
                <Banner currencies={currencies} />
                <List currencies={currencies} />
            </div> : <div id="loader">
                <div class="spinner"></div>
            </div>}
    </>
    )
}

export default Hero