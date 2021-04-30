import { useState, useEffect } from 'react'
// import { makeStyles } from '@material-ui/core/styles'


// const useStyles = makeStyles((theme) => ({
//     country: {
//         fill: 'blue'
//     }
// }))

export default function europe({onSelectCountry}) {
    const [showTooltip, setShowTooltip] = useState(false)
    function selectCountry(e) {
        console.log('[child] selectCountry: ', e)
        // onSelectCountry(e)
    }
    function mouseOver() {
        console.log('mouseOver!')
        setShowTooltip(true)
    }
    function mouseOut() {
        console.log('mouseOut!')
        setShowTooltip(false)
    }
    const Tooltip = () => <div>tooltip</div>

    return (
        <>
            <style jsx>{`
                .country:hover {
                    fill: #DA4567;
                    cursor: pointer;
                }
            `}</style>
            <h2>Europe SVG map</h2><br />
            <svg id="svg" width="800" height="600" xmlns="http://www.w3.org/2000/svg" onClick={selectCountry}>
                <g>
                    <title>Map</title>
                    <rect id="svg_france" className="country" x="176.02041" y="97.95918" width="165.30612" height="187.7551" fill="#9a9a9a" />
                    <rect id="svg_germany" className="country" x="341.63389" y="48.97959" width="150.67993" height="180.67747" fill="#9a9a9a" />
                    <rect id="svg_switzerland" className="country" x="341.62218" y="229.38243" width="107.52581" height="80.64436" />
                </g>
            </svg>
        </>
    )
}