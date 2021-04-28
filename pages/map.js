import { useState, useEffect } from 'react'
import Link from 'next/link'
// import Europe from '../components/svg/europe'
import dynamic from 'next/dynamic'
import Button from '@material-ui/core/Button'

export default function map() {
    const [country, setCountry] = useState('europe')

    function toggleMap(countryName) {
        console.log('toggleMap countryName: ', countryName)
        setCountry(countryName)
    }
    const getDynamicComponent = (c) => dynamic(() => import(`../components/svg/${c}`), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });

    function handleSelectCountry(e) {
        console.log('[parent] handleSelectCountry: ', e)
    }
    
    const DynamicComponent = getDynamicComponent(country);
    return (
        <>
            <h2>SVG Map</h2><br />
            <Link href="/">Home</Link><br />
            <Button variant="contained" color="primary" size="small" onClick={() => toggleMap('switzerland')}>Switzerland</Button>
            <Button variant="contained" color="secondary" size="small" onClick={() => toggleMap('germany')}>Germany</Button>
            {/* <Europe onSelectCountry={handleSelectCountry} /> */}
            {/* <Europe /> */}
            <DynamicComponent />

        </>
    )
}