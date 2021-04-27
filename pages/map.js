import { useState, useEffect } from 'react'
import Link from 'next/link'
import Europe from '../components/svg/europe'

export default function map() {
    function handleSelectCountry (e) {
        console.log('[parent] handleSelectCountry: ', e)
    }
    return (
        <>
            <h2>SVG Map</h2><br />
            <Link href="/">Home</Link><br />
            <Europe onSelectCountry={handleSelectCountry} />
        </>
    )
}