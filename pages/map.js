import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Button from '@material-ui/core/Button'
import ToucanUIButton from '../components/ui/Button'


export default function map() {
    const [country, setCountry] = useState('europe-uefa-euro2020')

    function toggleMap(countryName) {
        console.log('toggleMap countryName: ', countryName)
        setCountry(countryName)
    }
    const getDynamicComponent = (c) => dynamic(() => import(`../components/svg/${c}`), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });

    function handleSelectCountry(countryName) {
        console.log('[parent] handleSelectCountry: ', countryName)
        setCountry(countryName)
    }

    const DynamicComponent = getDynamicComponent(country);
    return (
        <>
            <h2>SVG Map</h2><br />
            <Link href="/">Home</Link><br /><br />
            <ToucanUIButton text={"Back to Europe"} size={"small"} color={"#12824C"} handleClick={() => toggleMap('europe-euro2020')} />
            <Button variant="contained" color="primary" size="small" onClick={() => toggleMap('switzerland-highcharts')}>Switzerland</Button>
            <Button variant="contained" color="secondary" size="small" onClick={() => toggleMap('germany')}>Germany</Button>


            {/* <Europe onSelectCountry={handleSelectCountry} /> */}
            {/* <Europe /> */}
            {/* <div style={{ border: '2px solid red' }}> */}
                <DynamicComponent onSelectCountry={handleSelectCountry} style={{}}/>
            {/* </div> */}

        </>
    )
}