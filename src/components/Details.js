import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LineChart from './LineChart';

const Details = () => {
    let { id } = useParams();
    const [info, setInfo] = useState(null);
    const [chartInfo, setChartInfo] = useState(null);

    const getChartInfo = useCallback(async () => {
        let url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=INR&days=1`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            let prices = data.prices;
            const labels = prices.map(point => new Date(point[0]).toLocaleTimeString());
            const values = prices.map(point => point[1]);
            let info = {
                labels: labels,
                datasets: [
                    {
                        label: 'Price',
                        data: values, fill: false,
                        borderColor: 'gold',
                        tension: 0.1
                    }
                ]
            };

            setChartInfo(info);
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    }, [id]);

    const fetchCryptoData = useCallback(async () => {
        const url = 'https://api.coingecko.com/api/v3/coins/' + id;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            console.log(data);
            setInfo(data);
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchCryptoData();
        getChartInfo();
    }, [fetchCryptoData, getChartInfo]);

    function formatCurrency(value, currency = 'INR') {
        const locale = currency === 'INR' ? 'en-IN' : 'en-US';

        if (typeof value === 'string') {
            value = parseFloat(value);
        }

        if (isNaN(value)) {
            throw new Error('Invalid number');
        }

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(value);
    }

    return (
        <div className='row p-4 details'>
            <div className='col-4'>
                {info ? (
                    <>
                        <img src={info.image.large} alt={info.name} />
                        <h1 className='bold'>{info.name}</h1>
                        <p>{info.description.en.split(". ")[0]}</p>
                        <h4>Rank: {info.market_cap_rank}</h4>
                        <h4>Current Price: {formatCurrency(info.market_data.current_price.inr)}</h4>
                        <h4>Market Cap: {formatCurrency(info.market_data.market_cap.inr)}</h4>
                    </>
                ) : (
                    <div id="loader">
                        <div className="spinner"></div>
                    </div>
                )}
            </div>
            <div className='col-8'>
                {chartInfo && <LineChart data={chartInfo} />}
            </div>
        </div>
    );
};

export default Details;
