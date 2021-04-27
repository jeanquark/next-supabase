import { useState, useEffect } from 'react'
import Link from 'next/link'
import Europe from '../components/svg/europe.svg'

export default function map() {
    const [showTooltip, setShowTooltip] = useState(false)
    function abc(e) {
        console.log('abc: ', e)
    }
    function handleMouseEnter() {
        console.log('handleMouseEnter')
    }
    function mouseOver () {
        console.log('mouseOver!')
        setShowTooltip(true)
    }
    function mouseOut () {
        console.log('mouseOut!')
        setShowTooltip(false)
    }
    const Tooltip = () => <div>tooltip</div>

    return (
        <>
            <h2>SVG Map</h2><br />
            <Link href="/">Home</Link><br />
            {/* <div onClick={abc}>
                <Europe onMouseEnter={handleMouseEnter} />
            </div> */}

            <svg
                onMouseOver={mouseOver}
                onMouseOut={mouseOut}
                className="icon-svg icon--hoverable-svg"
                viewBox="0 0 16 16" width="32">
                <path
                    fill="black"
                    d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
            {showTooltip ? <Tooltip /> : null}
        </>
    )
}