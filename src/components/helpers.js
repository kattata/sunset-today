export const convertCity = () => {

    const NodeGeocoder = require('node-geocoder');

    const options = {
        provider: 'google',
        httpAdapter: 'https',
        formatter: 'json'
    }

    let geocoder = NodeGeocoder(options);

    const res = geocoder.geocode('paris');

    return res;
}