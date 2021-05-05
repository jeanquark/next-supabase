import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function switzerland() {
    const [showTooltip, setShowTooltip] = useState(false)
    const [city, setCity] = useState('')
    function mouseOver(e) {
        console.log('mouseOver!: ', e)
        console.log('e.target.id: ', e.target.id)
        setCity(e.target.id)
        // setShowTooltip(true)
        showPopup(e.target.id)
    }
    function mouseOut() {
        console.log('mouseOut!')
        // setShowTooltip(false)
        hidePopup()
    }
    const Tooltip = () => (
        <div>tooltip {city}</div>
    )

    function showPopup(city) {
        console.log('showPopup: ', city)
        var myicon = document.getElementById(city);
        var mypopup = document.getElementById("mypopup");
        var iconPos = myicon.getBoundingClientRect();
        mypopup.style.left = (iconPos.right + 15) + "px";
        mypopup.style.top = (window.scrollY + iconPos.top - 30) + "px";
        mypopup.style.display = "block";
    }

    function hidePopup(evt) {
        console.log('hidePopup: ', evt)
        var mypopup = document.getElementById("mypopup");
        mypopup.style.display = "none";
    }

    return (
        <>
            <style jsx>{`
                .city:hover {
                    fill: #DA4567;
                    cursor: pointer;
                }
                #mypopup {
                    padding: 10px;
                    font-family: Arial, sans-serif;
                    background-color: white;
                    border-radius: 6px;
                    position: absolute;
                    display: none;
                }
                #mypopup::before {
                    content: "";
                    width: 12px;
                    height: 12px;
                    transform: rotate(45deg);
                    background-color: white;
                    position: absolute;
                    left: -6px;
                    top: 28px;
                }
            `}</style>
            <h2>Switzerland SVG map</h2><br />
            <div id="mypopup">
                <p>{city}</p>
            </div>

            <svg version="1.1" height="700pt" width="700pt" xmlns="http://www.w3.org/2000/svg">
                <title>Switzerland</title>
                <g id="admin1">

                    <g id="CH">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <name>Switzerland</name>
                            <labelrank>4</labelrank>
                            <country-abbrev>Switz.</country-abbrev>
                            <subregion>Western Europe</subregion>
                            <region-wb>Europe &amp; Central Asia</region-wb>
                            <iso-a3>CHE</iso-a3>
                            <iso-a2>CH</iso-a2>
                            <woe-id>23424957</woe-id>
                            <continent>Europe</continent>
                            <hc-key>ch</hc-key>
                            <hc-a2>SW</hc-a2>
                        </desc>
                    </g>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.FR" d="M148.0,232.5 L144.4,236.3 L140.0,234.2 L134.7,236.2 L135.8,234.0 L139.3,231.4 L144.2,225.9 L147.8,229.2 Z M131.5,236.9 L130.5,237.8 L128.0,234.0 L131.8,230.4 L133.7,231.4 L133.5,234.7 Z M202.6,191.3 L201.4,191.6 L200.9,190.4 L203.2,189.8 Z M202.0,276.1 L197.3,279.7 L188.4,282.2 L183.1,287.8 L180.1,289.9 L175.6,290.3 L170.7,293.6 L167.6,298.5 L164.0,300.2 L162.1,296.8 L160.3,289.8 L151.9,283.2 L148.1,282.2 L143.3,286.0 L139.2,285.7 L136.5,280.1 L137.9,277.4 L143.8,278.9 L149.9,271.9 L147.9,272.1 L143.1,268.6 L134.9,268.9 L135.5,264.0 L135.0,259.0 L135.7,253.1 L140.1,251.3 L144.2,250.9 L146.2,247.2 L156.4,233.5 L157.0,231.7 L153.6,229.1 L156.9,227.4 L161.2,221.5 L161.0,218.4 L162.5,215.3 L166.4,210.6 L164.4,209.4 L164.8,204.4 L163.7,202.1 L160.8,203.8 L152.4,192.1 L158.5,187.4 L167.8,201.0 L172.3,206.8 L172.6,209.0 L175.3,207.6 L177.6,204.5 L179.5,199.6 L181.1,200.4 L182.9,197.9 L181.0,196.8 L177.4,188.4 L176.5,180.9 L188.9,179.9 L200.2,175.6 L203.3,179.8 L198.4,184.2 L199.8,192.3 L198.1,197.0 L208.8,200.0 L221.1,201.4 L221.7,206.4 L218.6,209.9 L214.7,209.2 L215.1,216.5 L213.2,223.9 L212.5,233.3 L213.7,239.0 L224.3,246.4 L223.2,253.4 L221.5,256.4 L216.8,255.2 L214.4,257.6 L214.8,264.2 L214.0,269.3 L212.6,270.5 L208.4,270.7 Z M147.4,196.0 L153.7,202.6 L151.1,205.2 L155.0,207.2 L152.3,218.3 L155.2,219.6 L153.3,223.3 L150.5,224.5 L145.5,222.9 L139.3,224.0 L134.1,221.9 L134.9,219.7 L130.8,215.3 L130.2,209.4 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>7</labelrank>
                            <iso_3166_2>CH-FR</iso_3166_2>
                            <hasc>CH.FR</hasc>
                            <alt-name>Freiburg|Friburg|Friburgo</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347088</woe-id>
                            <longitude>6.85219</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Fribourg</woe-name>
                            <fips>SZ06</fips>
                            <latitude>46.8411</latitude>
                            <woe-label>Canton of Fribourg, CH, Switzerland</woe-label>
                            <postal-code>FR</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Fribourg</name>
                            <hc-key>ch-fr</hc-key>
                            <hc-a2>FR</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.LU" d="M391.6,180.9 L388.7,177.3 L386.5,176.8 L385.0,179.2 L378.4,179.5 L376.4,177.5 L370.8,179.8 L361.4,179.6 L355.0,181.7 L355.1,185.4 L346.6,186.2 L343.6,188.4 L344.1,192.6 L337.2,200.1 L334.4,199.2 L331.8,201.6 L330.1,207.5 L327.0,214.8 L329.0,222.2 L326.5,226.2 L323.3,225.9 L318.3,228.3 L316.2,228.2 L312.4,222.9 L302.4,214.6 L300.0,211.9 L298.6,205.7 L300.3,203.3 L301.0,195.4 L307.3,193.3 L309.4,190.1 L312.0,183.2 L313.1,178.0 L308.7,176.3 L304.7,175.9 L304.2,172.3 L301.1,167.6 L301.4,155.7 L303.5,149.7 L301.8,138.8 L296.5,126.4 L305.8,124.7 L309.3,124.7 L313.2,123.4 L314.4,121.2 L314.6,116.6 L320.8,117.5 L324.1,124.3 L334.7,120.3 L337.0,122.8 L344.1,124.0 L345.0,127.1 L347.6,129.0 L351.5,127.0 L355.7,119.1 L358.3,116.1 L363.4,117.0 L365.1,119.1 L372.3,140.4 L374.5,144.1 L378.3,147.2 L382.7,147.4 L384.6,150.5 L387.4,151.6 L388.3,154.0 L383.6,156.8 L379.9,163.4 L379.9,165.4 L382.4,167.4 L384.7,166.4 L390.9,168.0 L396.7,173.5 L397.8,175.4 L396.7,178.2 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-LU</iso_3166_2>
                            <hasc>CH.LU</hasc>
                            <alt-name>Lucerna|Luzern</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347093</woe-id>
                            <longitude>8.172190000000001</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Lucerne</woe-name>
                            <fips>SZ11</fips>
                            <latitude>47.096</latitude>
                            <woe-label>Canton of Lucerne, CH, Switzerland</woe-label>
                            <postal-code>LU</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Lucerne</name>
                            <hc-key>ch-lu</hc-key>
                            <hc-a2>LU</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.NI" d="M355.1,185.4 L355.0,181.7 L361.4,179.6 L370.8,179.8 L376.4,177.5 L378.4,179.5 L385.0,179.2 L386.5,176.8 L388.7,177.3 L391.6,180.9 L395.3,183.5 L406.4,182.1 L406.4,184.7 L404.3,191.3 L401.4,194.6 L393.5,198.5 L390.5,201.5 L392.3,205.6 L392.5,211.7 L385.1,211.9 L381.5,209.0 L377.7,211.0 L377.1,207.6 L375.3,209.0 L377.1,219.5 L381.6,225.7 L384.4,228.3 L380.0,229.7 L376.4,226.4 L373.2,224.5 L370.1,220.1 L369.7,214.8 L370.2,208.2 L371.2,204.6 L371.3,198.6 L370.2,197.0 L364.9,193.4 L367.4,186.5 L360.7,183.8 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-NW</iso_3166_2>
                            <hasc>CH.NW</hasc>
                            <alt-name>Nidvaldo|Nidwald|Unterwalden-le-Bas|Nidwaldo</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347095</woe-id>
                            <longitude>8.40344</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Nidwalden</woe-name>
                            <fips>SZ13</fips>
                            <latitude>46.934</latitude>
                            <woe-label>Canton of Nidwalden, CH, Switzerland</woe-label>
                            <postal-code>NI</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Nidwalden</name>
                            <hc-key>ch-ni</hc-key>
                            <hc-a2>NI</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.VS" d="M143.0,309.0 L143.0,309.0 L147.2,315.4 L147.0,321.4 L152.6,324.6 L153.9,330.6 L163.3,348.0 L169.5,357.4 L180.7,350.9 L184.5,346.5 L186.3,345.7 L191.6,339.8 L194.1,335.0 L194.0,331.3 L198.6,326.3 L204.1,323.3 L206.3,319.2 L212.7,318.2 L212.7,322.1 L214.5,322.9 L220.4,321.0 L226.2,316.4 L235.2,316.0 L240.2,317.7 L248.1,315.1 L250.4,313.1 L247.5,310.7 L251.1,308.6 L256.4,307.1 L260.6,302.5 L263.8,303.0 L274.0,308.1 L275.8,308.0 L294.9,294.5 L300.4,294.9 L303.7,293.7 L313.7,287.1 L314.8,285.3 L313.6,282.0 L319.5,277.8 L323.5,277.7 L336.7,280.3 L341.7,283.2 L345.8,283.6 L348.4,286.1 L360.2,283.3 L371.4,276.4 L374.5,272.4 L376.3,264.0 L380.8,256.7 L382.5,256.5 L384.4,258.7 L383.9,263.3 L382.1,270.5 L384.3,277.2 L386.6,280.9 L392.7,284.3 L388.2,290.3 L385.6,292.0 L380.1,293.4 L378.3,299.8 L378.5,302.4 L371.9,303.8 L367.7,306.1 L363.1,312.4 L364.7,314.1 L363.8,318.4 L360.4,321.6 L356.0,323.8 L348.3,333.8 L345.0,336.0 L338.3,337.4 L334.9,338.9 L331.8,342.0 L329.6,346.0 L333.7,350.1 L338.2,359.0 L338.5,367.2 L335.1,374.4 L328.2,380.3 L323.3,381.1 L320.6,384.6 L319.2,396.0 L315.3,402.8 L312.7,404.2 L301.6,406.5 L297.5,411.5 L297.1,415.8 L293.8,415.9 L292.8,420.4 L290.9,421.5 L282.9,420.5 L275.4,417.7 L269.5,418.0 L266.4,413.1 L261.7,409.4 L245.8,405.1 L243.2,406.4 L239.9,411.2 L231.9,413.4 L222.5,420.0 L217.5,421.7 L205.7,420.2 L199.2,423.5 L189.5,427.2 L179.6,427.9 L174.9,426.8 L171.3,424.6 L164.4,416.6 L158.7,400.7 L148.5,388.5 L144.9,386.9 L141.3,389.3 L138.5,388.0 L138.7,379.9 L141.7,374.0 L139.4,371.7 L127.0,368.6 L125.8,364.8 L127.4,357.2 L130.4,349.2 L136.2,338.7 L132.8,332.5 L127.5,326.5 L124.6,321.3 L125.6,318.7 L129.8,314.1 L130.9,308.2 L141.1,310.1 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-VS</iso_3166_2>
                            <hasc>CH.VS</hasc>
                            <alt-name>Vallais|Vallese|Wallis</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347104</woe-id>
                            <longitude>7.61347</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Valais</woe-name>
                            <fips>SZ22</fips>
                            <latitude>46.2023</latitude>
                            <woe-label>Canton of Valais, CH, Switzerland</woe-label>
                            <postal-code>VS</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Valais</name>
                            <hc-key>ch-vs</hc-key>
                            <hc-a2>VS</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.SG" d="M545.7,67.5 L548.7,70.1 L552.2,69.0 L557.5,64.6 L562.4,71.6 L568.0,74.2 L572.4,78.0 L572.4,87.5 L570.9,90.9 L565.1,98.4 L563.1,105.9 L557.9,112.2 L550.6,124.8 L548.0,132.4 L547.7,139.9 L551.8,150.4 L551.9,155.2 L550.5,158.2 L546.4,163.0 L546.6,165.1 L549.5,173.5 L555.1,183.1 L552.4,184.8 L551.4,187.8 L547.4,193.6 L546.8,198.5 L544.4,203.3 L540.5,205.8 L535.6,203.0 L515.0,200.1 L513.0,200.3 L510.6,197.5 L510.9,195.4 L508.9,189.0 L510.0,181.3 L507.1,173.6 L504.6,171.0 L497.8,172.6 L493.9,170.7 L499.5,166.1 L500.4,162.9 L501.1,152.3 L485.0,149.1 L482.7,147.8 L474.7,140.5 L471.3,141.8 L466.2,135.8 L466.8,131.7 L462.0,130.3 L447.6,131.7 L439.3,130.2 L441.4,125.0 L444.2,122.8 L452.5,123.5 L461.5,119.4 L463.5,115.2 L468.9,108.6 L467.6,102.0 L463.3,94.6 L464.8,94.4 L469.7,87.2 L471.9,82.6 L478.2,81.0 L478.3,76.6 L474.1,73.6 L474.1,70.7 L478.3,68.5 L483.6,68.6 L484.6,70.0 L493.3,70.0 L496.6,65.9 L498.9,68.6 L503.8,71.0 L512.4,72.7 L518.4,70.7 L519.9,67.4 L519.1,64.0 L514.6,64.2 L516.6,61.8 L524.4,59.6 L525.8,61.9 L525.6,65.9 L529.1,70.2 L531.4,71.7 L532.4,69.6 L540.1,63.7 L542.8,68.2 Z M547.9,100.3 L546.8,96.9 L547.6,91.3 L553.6,89.3 L555.8,90.4 L562.3,86.3 L562.0,84.3 L562.6,82.1 L566.0,78.6 L559.8,77.5 L553.5,74.5 L548.9,77.9 L538.3,82.3 L536.8,86.2 L534.0,87.8 L530.7,87.8 L518.3,90.2 L514.8,89.3 L508.0,89.9 L504.0,97.3 L501.9,99.5 L503.9,103.4 L506.8,104.2 L504.3,109.5 L505.3,114.6 L503.6,116.7 L506.7,118.8 L514.3,119.8 L520.6,123.5 L524.1,122.9 L528.6,125.5 L530.9,125.8 L535.2,124.2 L540.3,121.0 L542.4,118.6 L545.4,113.0 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-SG</iso_3166_2>
                            <hasc>CH.SG</hasc>
                            <alt-name>Saint-Gall|San Gallo|Son Gagl</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347097</woe-id>
                            <longitude>9.212669999999999</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Sankt Gallen</woe-name>
                            <fips>SZ15</fips>
                            <latitude>47.1524</latitude>
                            <woe-label>Canton of St. Gallen, CH, Switzerland</woe-label>
                            <postal-code>SG</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Sankt Gallen</name>
                            <hc-key>ch-sg</hc-key>
                            <hc-a2>SG</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.AR" d="M547.6,91.3 L546.8,96.9 L547.9,100.3 L543.0,100.2 L526.8,92.6 L525.7,98.0 L524.1,101.7 L520.6,105.0 L519.7,111.6 L524.1,122.9 L520.6,123.5 L514.3,119.8 L506.7,118.8 L503.6,116.7 L505.3,114.6 L504.3,109.5 L506.8,104.2 L503.9,103.4 L501.9,99.5 L504.0,97.3 L508.0,89.9 L514.8,89.3 L518.3,90.2 L530.7,87.8 L534.0,87.8 L536.8,86.2 L538.3,82.3 L548.9,77.9 L553.5,74.5 L559.8,77.5 L566.0,78.6 L562.1,80.2 L556.9,80.5 L557.2,81.9 L562.0,84.3 L562.3,86.3 L555.8,90.4 L556.1,84.6 L553.8,82.2 L551.3,84.0 L551.4,87.0 L548.0,88.7 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-AR</iso_3166_2>
                            <hasc>CH.AR</hasc>
                            <alt-name>Appenzell Ausser-Rhoden|Appenzell Outer Rhodes|Appenzell dadens|Appenzell Rhodes Extérieures|Appenzello Esterno</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347084</woe-id>
                            <longitude>9.397259999999999</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Appenzell Ausserrhoden</woe-name>
                            <fips>SZ02</fips>
                            <latitude>47.3911</latitude>
                            <woe-label>Canton of Appenzell Outer-Rhodes, CH, Switzerland</woe-label>
                            <postal-code>AR</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Appenzell Ausserrhoden</name>
                            <hc-key>ch-ar</hc-key>
                            <hc-a2>AR</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.TI" d="M499.1,364.9 L487.7,372.7 L484.8,377.0 L484.5,385.0 L482.8,389.8 L477.9,391.8 L473.9,394.8 L473.2,397.4 L476.0,405.2 L470.9,409.9 L475.3,420.1 L481.7,422.6 L483.5,426.3 L482.9,430.1 L479.0,437.7 L474.0,443.8 L469.3,442.9 L464.1,440.6 L457.9,442.5 L460.1,433.6 L459.8,429.8 L457.7,423.9 L453.4,415.5 L451.4,413.2 L442.4,408.4 L437.4,407.4 L441.0,399.4 L445.5,394.0 L447.8,388.8 L443.8,383.5 L441.5,382.7 L434.2,382.4 L431.9,379.5 L429.6,379.5 L426.1,382.2 L423.3,382.1 L416.1,377.8 L411.6,376.0 L401.8,361.4 L397.4,356.9 L389.1,353.0 L386.3,350.6 L384.6,347.0 L384.0,341.5 L384.6,335.8 L387.2,324.2 L387.8,317.8 L387.1,305.9 L385.0,302.8 L378.5,302.4 L378.3,299.8 L380.1,293.4 L385.6,292.0 L388.2,290.3 L392.7,284.3 L397.8,280.0 L400.0,273.9 L403.9,272.4 L417.4,275.6 L423.8,272.8 L429.0,275.2 L440.9,276.4 L450.0,274.8 L457.9,271.7 L459.7,269.8 L459.1,267.4 L460.4,264.7 L466.8,262.4 L468.2,265.9 L473.4,266.5 L477.0,268.2 L479.5,271.3 L477.5,275.7 L475.9,284.2 L477.8,290.7 L481.1,295.9 L485.5,295.6 L487.3,299.0 L487.0,304.6 L488.7,310.4 L487.2,315.4 L487.4,322.2 L484.5,328.2 L484.6,332.6 L482.4,336.7 L485.5,345.1 L485.2,349.9 L487.2,354.2 L490.8,356.9 L495.4,362.2 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-TI</iso_3166_2>
                            <hasc>CH.TI</hasc>
                            <alt-name>Tesino|Tessin</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347102</woe-id>
                            <longitude>8.790190000000001</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Ticino</woe-name>
                            <fips>SZ20</fips>
                            <latitude>46.3604</latitude>
                            <woe-label>Canton of Ticino, CH, Switzerland</woe-label>
                            <postal-code>TI</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Ticino</name>
                            <hc-key>ch-ti</hc-key>
                            <hc-a2>TI</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.GL" d="M471.3,141.8 L474.7,140.5 L482.7,147.8 L485.0,149.1 L501.1,152.3 L500.4,162.9 L499.5,166.1 L493.9,170.7 L497.8,172.6 L504.6,171.0 L507.1,173.6 L510.0,181.3 L508.9,189.0 L510.9,195.4 L510.6,197.5 L506.3,201.3 L503.7,204.9 L496.5,206.5 L491.3,210.1 L488.5,210.1 L486.7,208.3 L482.6,207.6 L479.7,208.9 L479.6,211.5 L477.4,216.5 L474.1,220.1 L470.6,221.7 L462.1,224.3 L459.4,221.9 L453.9,221.0 L453.9,214.2 L459.0,210.1 L464.0,208.5 L465.6,206.4 L465.6,202.9 L462.9,197.1 L466.2,195.4 L467.5,189.8 L466.6,187.3 L462.8,183.7 L463.1,181.9 L458.9,175.7 L456.7,173.7 L457.5,171.2 L463.0,168.2 L467.1,161.7 L466.9,157.1 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-GL</iso_3166_2>
                            <hasc>CH.GL</hasc>
                            <alt-name>Glaris|Glarona|Glaruna</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347090</woe-id>
                            <longitude>9.056509999999999</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Glarus</woe-name>
                            <fips>SZ08</fips>
                            <latitude>47.0096</latitude>
                            <woe-label>Canton of Glarus, CH, Switzerland</woe-label>
                            <postal-code>GL</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Glarus</name>
                            <hc-key>ch-gl</hc-key>
                            <hc-a2>GL</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.GR" d="M499.1,364.9 L495.4,362.2 L490.8,356.9 L487.2,354.2 L485.2,349.9 L485.5,345.1 L482.4,336.7 L484.6,332.6 L484.5,328.2 L487.4,322.2 L487.2,315.4 L488.7,310.4 L487.0,304.6 L487.3,299.0 L485.5,295.6 L481.1,295.9 L477.8,290.7 L475.9,284.2 L477.5,275.7 L479.5,271.3 L477.0,268.2 L473.4,266.5 L468.2,265.9 L466.8,262.4 L460.4,264.7 L459.1,267.4 L459.7,269.8 L457.9,271.7 L450.0,274.8 L440.9,276.4 L429.0,275.2 L423.8,272.8 L424.3,269.8 L422.8,264.5 L421.0,263.4 L420.1,259.2 L424.2,248.0 L429.8,245.7 L434.9,239.4 L440.5,239.4 L443.9,237.7 L443.8,235.7 L446.6,231.0 L446.8,226.5 L452.2,223.2 L453.9,221.0 L459.4,221.9 L462.1,224.3 L470.6,221.7 L474.1,220.1 L477.4,216.5 L479.6,211.5 L479.7,208.9 L482.6,207.6 L486.7,208.3 L488.5,210.1 L491.3,210.1 L496.5,206.5 L503.7,204.9 L506.3,201.3 L510.6,197.5 L513.0,200.3 L515.0,200.1 L535.6,203.0 L540.5,205.8 L544.4,203.3 L546.8,198.5 L547.4,193.6 L551.4,187.8 L552.4,184.8 L555.1,183.1 L549.5,173.5 L546.6,165.1 L559.4,167.6 L573.4,166.3 L576.0,166.6 L605.0,175.5 L606.4,178.5 L605.9,192.4 L611.7,198.1 L628.2,203.1 L634.2,208.7 L637.7,210.7 L644.4,212.7 L651.5,211.6 L658.2,208.1 L659.7,205.8 L660.9,199.3 L663.1,195.4 L672.4,195.3 L672.4,191.2 L675.0,186.0 L678.8,181.5 L683.2,178.8 L687.4,181.0 L690.7,186.1 L697.4,191.8 L698.3,195.5 L696.5,203.2 L696.9,208.0 L696.3,215.2 L694.9,218.7 L691.6,222.8 L693.5,232.4 L689.1,237.0 L688.5,244.8 L684.7,251.2 L686.1,255.5 L688.9,258.7 L695.5,259.3 L698.8,261.9 L700.0,266.2 L700.0,272.0 L698.9,277.6 L696.8,281.2 L694.0,281.8 L682.9,279.0 L677.5,279.6 L673.8,278.6 L670.7,275.4 L664.3,273.3 L663.6,270.9 L664.0,263.7 L661.5,261.8 L657.5,261.9 L643.0,266.3 L641.5,267.1 L639.1,276.1 L633.2,283.2 L632.4,292.2 L633.0,295.9 L635.2,298.0 L632.5,302.7 L635.0,305.7 L639.5,307.4 L649.2,309.7 L650.3,312.1 L649.2,317.0 L644.9,321.5 L643.0,328.8 L645.1,333.2 L651.6,339.6 L653.6,343.6 L651.6,347.9 L647.3,350.7 L640.8,353.2 L635.7,353.2 L635.5,348.2 L633.9,344.4 L627.7,339.0 L625.3,336.0 L624.2,326.6 L623.1,323.0 L619.2,320.5 L613.0,319.5 L606.2,320.7 L595.9,326.2 L592.7,327.2 L586.9,324.6 L583.6,326.5 L583.5,333.3 L581.2,336.6 L578.3,337.9 L560.5,337.8 L553.6,334.3 L551.6,331.6 L548.4,323.5 L543.6,320.5 L542.2,318.2 L542.4,314.7 L541.3,293.3 L540.8,291.9 L537.1,294.0 L534.8,298.4 L531.9,298.5 L528.0,294.8 L527.9,292.0 L524.8,291.2 L517.3,292.2 L514.3,294.9 L511.6,300.3 L510.4,305.8 L514.0,310.3 L514.0,318.5 L516.1,326.5 L515.3,334.3 L510.8,343.8 L508.5,351.8 L505.3,355.8 L501.8,357.9 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-GR</iso_3166_2>
                            <hasc>CH.GR</hasc>
                            <alt-name>Graubünden|Grigioni|Grischun|Grisons</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347091</woe-id>
                            <longitude>9.559530000000001</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Graubünden</woe-name>
                            <fips>SZ09</fips>
                            <latitude>46.6729</latitude>
                            <woe-label>Canton of Graubunden, CH, Switzerland</woe-label>
                            <postal-code>GR</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Graubünden</name>
                            <hc-key>ch-gr</hc-key>
                            <hc-a2>GR</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.SZ" d="M471.3,141.8 L466.9,157.1 L467.1,161.7 L463.0,168.2 L457.5,171.2 L456.7,173.7 L458.9,175.7 L463.1,181.9 L462.8,183.7 L466.6,187.3 L467.5,189.8 L466.2,195.4 L462.9,197.1 L456.0,201.0 L449.2,203.8 L448.7,200.0 L446.0,197.5 L444.5,194.2 L438.8,194.0 L437.0,192.8 L428.8,196.8 L424.9,191.4 L420.2,191.5 L413.6,188.6 L412.2,182.6 L406.4,182.1 L395.3,183.5 L391.6,180.9 L396.7,178.2 L397.8,175.4 L396.7,173.5 L390.9,168.0 L384.7,166.4 L382.4,167.4 L379.9,165.4 L379.9,163.4 L383.6,156.8 L388.3,154.0 L391.5,152.1 L394.1,152.6 L396.8,158.7 L404.6,158.0 L407.4,159.9 L410.5,159.6 L418.1,157.1 L424.1,150.7 L425.3,147.4 L428.0,144.5 L425.2,142.5 L424.3,137.7 L426.7,135.3 L432.7,131.5 L439.3,130.2 L447.6,131.7 L462.0,130.3 L466.8,131.7 L466.2,135.8 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-SZ</iso_3166_2>
                            <hasc>CH.SZ</hasc>
                            <alt-name>NULL</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347099</woe-id>
                            <longitude>8.68573</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Schwyz</woe-name>
                            <fips>SZ17</fips>
                            <latitude>47.0455</latitude>
                            <woe-label>Canton of Schwyz, CH, Switzerland</woe-label>
                            <postal-code>SZ</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Schwyz</name>
                            <hc-key>ch-sz</hc-key>
                            <hc-a2>SZ</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.TG" d="M545.7,67.5 L542.8,68.2 L540.1,63.7 L532.4,69.6 L531.4,71.7 L529.1,70.2 L525.6,65.9 L525.8,61.9 L524.4,59.6 L516.6,61.8 L514.6,64.2 L519.1,64.0 L519.9,67.4 L518.4,70.7 L512.4,72.7 L503.8,71.0 L498.9,68.6 L496.6,65.9 L493.3,70.0 L484.6,70.0 L483.6,68.6 L478.3,68.5 L474.1,70.7 L474.1,73.6 L478.3,76.6 L478.2,81.0 L471.9,82.6 L469.7,87.2 L464.8,94.4 L463.3,94.6 L457.2,88.1 L460.1,81.9 L457.4,79.7 L456.7,75.1 L454.7,71.1 L456.2,69.4 L457.1,62.1 L455.6,60.5 L448.7,56.7 L449.1,52.8 L447.4,50.7 L436.0,45.3 L434.1,42.8 L436.4,40.7 L442.3,43.5 L446.3,37.1 L444.1,30.1 L441.6,31.2 L443.4,26.9 L446.6,26.8 L451.2,29.3 L455.7,32.7 L459.4,33.6 L465.3,33.1 L470.8,31.3 L473.2,28.7 L476.1,27.6 L493.0,29.5 L501.3,29.4 L504.9,34.6 L529.9,49.4 L531.3,50.9 L534.6,57.8 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-TG</iso_3166_2>
                            <hasc>CH.TG</hasc>
                            <alt-name>Thurgovie|Turgovia|Turg˘via</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347101</woe-id>
                            <longitude>9.14593</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Thurgau</woe-name>
                            <fips>SZ19</fips>
                            <latitude>47.5858</latitude>
                            <woe-label>Canton of Thurgau, CH, Switzerland</woe-label>
                            <postal-code>TG</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Thurgau</name>
                            <hc-key>ch-tg</hc-key>
                            <hc-a2>TG</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.SH" d="M412.1,32.1 L408.2,31.0 L400.9,32.2 L394.3,35.9 L391.6,36.0 L384.6,31.2 L381.5,30.2 L382.5,27.8 L381.5,24.3 L383.2,20.9 L388.6,17.4 L389.8,12.9 L392.6,8.3 L403.6,6.0 L405.9,4.9 L404.5,1.4 L406.9,0.0 L413.4,1.5 L414.3,8.8 L417.7,8.7 L418.5,3.8 L421.8,3.0 L425.5,9.6 L430.3,9.9 L431.2,12.2 L428.3,17.5 L430.8,24.0 L438.8,23.9 L437.6,22.5 L438.9,18.1 L443.0,18.3 L447.9,21.2 L451.8,24.9 L449.0,25.6 L451.2,29.3 L446.6,26.8 L443.4,26.9 L441.6,31.2 L435.5,34.9 L429.4,34.6 L427.0,33.5 L425.4,30.7 L425.7,23.8 L419.1,23.6 Z M405.7,45.8 L407.0,47.4 L409.4,46.2 L407.4,52.1 L405.2,53.7 L402.2,50.5 L402.4,48.9 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-SH</iso_3166_2>
                            <hasc>CH.SH</hasc>
                            <alt-name>Schaffhouse|Schaffusa|Sciaffusa</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347098</woe-id>
                            <longitude>8.623200000000001</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Schaffhausen</woe-name>
                            <fips>SZ16</fips>
                            <latitude>47.7205</latitude>
                            <woe-label>Canton of Schaffhausen, CH, Switzerland</woe-label>
                            <postal-code>SH</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Schaffhausen</name>
                            <hc-key>ch-sh</hc-key>
                            <hc-a2>SH</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.UR" d="M462.9,197.1 L465.6,202.9 L465.6,206.4 L464.0,208.5 L459.0,210.1 L453.9,214.2 L453.9,221.0 L452.2,223.2 L446.8,226.5 L446.6,231.0 L443.8,235.7 L443.9,237.7 L440.5,239.4 L434.9,239.4 L429.8,245.7 L424.2,248.0 L420.1,259.2 L421.0,263.4 L422.8,264.5 L424.3,269.8 L423.8,272.8 L417.4,275.6 L403.9,272.4 L400.0,273.9 L397.8,280.0 L392.7,284.3 L386.6,280.9 L384.3,277.2 L382.1,270.5 L383.9,263.3 L384.4,258.7 L382.5,256.5 L381.4,249.1 L383.1,248.1 L388.0,248.6 L389.0,244.4 L387.0,237.3 L388.4,231.1 L393.4,229.6 L393.8,227.4 L392.2,223.4 L394.1,217.6 L396.8,213.6 L392.5,211.7 L392.3,205.6 L390.5,201.5 L393.5,198.5 L401.4,194.6 L404.3,191.3 L406.4,184.7 L406.4,182.1 L412.2,182.6 L413.6,188.6 L420.2,191.5 L424.9,191.4 L428.8,196.8 L437.0,192.8 L438.8,194.0 L444.5,194.2 L446.0,197.5 L448.7,200.0 L449.2,203.8 L456.0,201.0 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-UR</iso_3166_2>
                            <hasc>CH.UR</hasc>
                            <alt-name>NULL</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347103</woe-id>
                            <longitude>8.633010000000001</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Uri</woe-name>
                            <fips>SZ21</fips>
                            <latitude>46.809</latitude>
                            <woe-label>Canton of Uri, CH, Switzerland</woe-label>
                            <postal-code>UR</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Uri</name>
                            <hc-key>ch-ur</hc-key>
                            <hc-a2>UR</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.ZH" d="M441.6,31.2 L444.1,30.1 L446.3,37.1 L442.3,43.5 L436.4,40.7 L434.1,42.8 L436.0,45.3 L447.4,50.7 L449.1,52.8 L448.7,56.7 L455.6,60.5 L457.1,62.1 L456.2,69.4 L454.7,71.1 L456.7,75.1 L457.4,79.7 L460.1,81.9 L457.2,88.1 L463.3,94.6 L467.6,102.0 L468.9,108.6 L463.5,115.2 L461.5,119.4 L452.5,123.5 L444.2,122.8 L441.4,125.0 L439.3,130.2 L432.7,131.5 L426.7,135.3 L424.3,137.7 L425.2,142.5 L421.8,143.0 L416.2,140.1 L413.5,136.2 L408.1,130.8 L402.1,129.8 L394.9,131.6 L391.5,131.3 L384.5,128.6 L383.2,124.3 L379.5,115.2 L384.4,113.1 L388.7,107.0 L389.2,104.8 L384.6,106.2 L382.4,102.7 L382.8,98.1 L377.8,94.5 L382.9,87.4 L380.5,83.8 L376.1,73.1 L375.3,70.0 L376.2,63.5 L378.7,59.4 L382.0,56.1 L385.8,49.2 L390.1,48.5 L392.0,43.6 L396.7,40.6 L401.2,40.1 L405.7,45.8 L402.4,48.9 L402.2,50.5 L405.2,53.7 L407.4,52.1 L409.4,46.2 L410.0,45.0 L410.0,36.3 L412.1,35.6 L413.3,37.8 L414.1,32.5 L412.1,32.1 L419.1,23.6 L425.7,23.8 L425.4,30.7 L427.0,33.5 L429.4,34.6 L435.5,34.9 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>7</labelrank>
                            <iso_3166_2>CH-ZH</iso_3166_2>
                            <hasc>CH.ZH</hasc>
                            <alt-name>Turitg|Zurigo|Zürih|Zurique</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347107</woe-id>
                            <longitude>8.6609</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Zürich</woe-name>
                            <fips>SZ25</fips>
                            <latitude>47.4297</latitude>
                            <woe-label>Canton of Zurich, CH, Switzerland</woe-label>
                            <postal-code>ZH</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Zürich</name>
                            <hc-key>ch-zh</hc-key>
                            <hc-a2>ZH</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.ZG" d="M425.2,142.5 L428.0,144.5 L425.3,147.4 L424.1,150.7 L418.1,157.1 L410.5,159.6 L407.4,159.9 L404.6,158.0 L396.8,158.7 L394.1,152.6 L391.5,152.1 L388.3,154.0 L387.4,151.6 L384.6,150.5 L382.7,147.4 L381.7,139.6 L380.9,130.1 L383.2,124.3 L384.5,128.6 L391.5,131.3 L394.9,131.6 L402.1,129.8 L408.1,130.8 L413.5,136.2 L416.2,140.1 L421.8,143.0 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-ZG</iso_3166_2>
                            <hasc>CH.ZG</hasc>
                            <alt-name>Zoug|Zugo</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347106</woe-id>
                            <longitude>8.547470000000001</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Zug</woe-name>
                            <fips>SZ24</fips>
                            <latitude>47.1578</latitude>
                            <woe-label>Canton of Zug, CH, Switzerland</woe-label>
                            <postal-code>ZG</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Zug</name>
                            <hc-key>ch-zg</hc-key>
                            <hc-a2>ZG</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.VD" d="M130.9,308.2 L130.8,306.5 L143.0,309.0 L141.1,310.1 Z M152.4,192.1 L160.8,203.8 L163.7,202.1 L164.8,204.4 L164.4,209.4 L166.4,210.6 L162.5,215.3 L161.0,218.4 L161.2,221.5 L156.9,227.4 L153.6,229.1 L157.0,231.7 L156.4,233.5 L146.2,247.2 L144.2,250.9 L140.1,251.3 L135.7,253.1 L135.0,259.0 L135.5,264.0 L134.9,268.9 L143.1,268.6 L147.9,272.1 L149.9,271.9 L143.8,278.9 L137.9,277.4 L136.5,280.1 L139.2,285.7 L143.3,286.0 L148.1,282.2 L151.9,283.2 L160.3,289.8 L162.1,296.8 L164.0,300.2 L167.6,298.5 L170.7,293.6 L175.6,290.3 L180.1,289.9 L183.1,287.8 L188.4,282.2 L197.3,279.7 L202.0,276.1 L203.7,281.0 L202.9,287.6 L200.4,291.7 L199.8,298.5 L195.3,302.6 L196.5,308.9 L194.6,314.3 L199.7,319.8 L198.6,321.8 L198.6,326.3 L194.0,331.3 L194.1,335.0 L191.6,339.8 L186.3,345.7 L184.5,346.5 L180.7,350.9 L169.5,357.4 L163.3,348.0 L153.9,330.6 L152.6,324.6 L147.0,321.4 L147.2,315.4 L143.0,309.0 L150.4,308.8 L153.8,304.7 L151.0,300.4 L144.1,296.5 L130.8,291.7 L105.6,281.8 L102.2,281.0 L88.7,281.7 L86.2,282.6 L76.8,289.8 L74.2,291.2 L63.9,292.1 L58.4,295.6 L35.4,328.5 L34.9,328.6 L26.5,321.2 L29.5,315.1 L29.4,312.7 L25.5,306.7 L17.3,301.2 L19.1,299.6 L19.3,289.7 L21.1,287.9 L26.8,278.8 L32.5,272.1 L28.9,267.8 L28.6,264.8 L30.7,262.2 L52.2,244.0 L63.4,238.3 L69.2,232.6 L74.4,230.1 L77.9,226.8 L78.6,221.2 L76.6,216.4 L80.7,206.5 L91.4,206.0 L104.1,199.7 L108.8,198.3 L115.4,193.5 L124.6,188.3 L125.0,194.6 L127.4,198.0 L127.9,203.7 L130.2,209.4 L130.8,215.3 L134.9,219.7 L134.1,221.9 L139.3,224.0 L145.5,222.9 L150.5,224.5 L153.3,223.3 L155.2,219.6 L152.3,218.3 L155.0,207.2 L151.1,205.2 L153.7,202.6 L147.4,196.0 Z M148.0,232.5 L147.8,229.2 L144.2,225.9 L139.3,231.4 L135.8,234.0 L134.7,236.2 L140.0,234.2 L144.4,236.3 Z M131.5,236.9 L133.5,234.7 L133.7,231.4 L131.8,230.4 L128.0,234.0 L130.5,237.8 Z M176.5,180.9 L177.4,188.4 L181.0,196.8 L182.9,197.9 L181.1,200.4 L179.5,199.6 L177.6,204.5 L175.3,207.6 L172.6,209.0 L172.3,206.8 L167.8,201.0 L158.5,187.4 L170.3,178.2 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-VD</iso_3166_2>
                            <hasc>CH.VD</hasc>
                            <alt-name>Vad|Waadt|Waadtland</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347105</woe-id>
                            <longitude>6.5118</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Vaud</woe-name>
                            <fips>SZ06</fips>
                            <latitude>46.6204</latitude>
                            <woe-label>Canton of Vaud, CH, Switzerland</woe-label>
                            <postal-code>VD</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Vaud</name>
                            <hc-key>ch-vd</hc-key>
                            <hc-a2>VD</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.BL" d="M220.8,80.2 L227.1,80.6 L228.6,80.1 L227.9,84.5 L227.8,84.5 L227.8,84.5 L221.6,81.3 Z M227.9,84.6 L227.9,84.6 L236.4,84.4 L238.7,82.9 L237.4,79.0 L233.6,76.2 L234.7,71.8 L232.8,68.8 L234.6,66.9 L237.6,68.2 L237.7,73.2 L238.7,76.1 L241.2,76.2 L250.9,74.3 L250.2,66.9 L243.7,65.7 L242.4,62.1 L246.1,61.6 L246.8,58.1 L243.4,55.9 L249.3,51.3 L254.7,55.2 L257.6,55.7 L259.5,57.9 L263.8,56.3 L267.3,59.2 L268.4,54.3 L273.9,56.1 L280.6,54.8 L288.1,58.9 L288.8,63.3 L290.9,63.1 L294.8,59.7 L295.6,56.0 L299.1,56.2 L308.0,69.7 L312.6,70.2 L312.9,74.8 L314.8,76.1 L313.2,79.9 L314.5,84.0 L310.7,87.2 L303.5,88.3 L301.7,92.3 L291.8,96.8 L288.7,102.4 L283.6,100.3 L277.8,96.0 L274.1,95.0 L268.7,95.4 L266.6,91.6 L266.4,86.8 L271.5,85.4 L273.5,83.5 L274.6,77.6 L278.1,73.4 L277.2,71.9 L270.8,67.8 L268.5,69.6 L263.2,69.4 L262.2,71.9 L264.9,74.4 L263.1,79.3 L261.2,81.2 L256.9,81.7 L257.3,84.6 L251.9,85.6 L249.0,89.4 L246.4,90.4 L241.4,88.5 L238.2,88.7 L235.8,92.3 L233.1,91.5 L231.9,88.0 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-BL</iso_3166_2>
                            <hasc>CH.BS</hasc>
                            <alt-name>NULL</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347085</woe-id>
                            <longitude>7.72662</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Basel-Landschaft</woe-name>
                            <fips>SZ05</fips>
                            <latitude>47.5056</latitude>
                            <woe-label>Canton of Basel-Country, CH, Switzerland</woe-label>
                            <postal-code>BL</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Basel-Landschaft</name>
                            <hc-key>ch-bl</hc-key>
                            <hc-a2>BL</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.BE" d="M296.5,126.4 L301.8,138.8 L303.5,149.7 L301.4,155.7 L301.1,167.6 L304.2,172.3 L304.7,175.9 L308.7,176.3 L313.1,178.0 L312.0,183.2 L309.4,190.1 L307.3,193.3 L301.0,195.4 L300.3,203.3 L298.6,205.7 L300.0,211.9 L302.4,214.6 L312.4,222.9 L316.2,228.2 L318.3,228.3 L323.3,225.9 L326.5,226.2 L334.3,227.2 L341.0,231.8 L344.0,233.0 L350.3,231.1 L361.3,233.1 L364.4,232.6 L369.6,229.0 L376.4,226.4 L380.0,229.7 L381.4,230.9 L385.3,229.9 L388.4,231.1 L387.0,237.3 L389.0,244.4 L388.0,248.6 L383.1,248.1 L381.4,249.1 L382.5,256.5 L380.8,256.7 L376.3,264.0 L374.5,272.4 L371.4,276.4 L360.2,283.3 L348.4,286.1 L345.8,283.6 L341.7,283.2 L336.7,280.3 L323.5,277.7 L319.5,277.8 L313.6,282.0 L314.8,285.3 L313.7,287.1 L303.7,293.7 L300.4,294.9 L294.9,294.5 L275.8,308.0 L274.0,308.1 L263.8,303.0 L260.6,302.5 L256.4,307.1 L251.1,308.6 L247.5,310.7 L250.4,313.1 L248.1,315.1 L240.2,317.7 L235.2,316.0 L226.2,316.4 L220.4,321.0 L214.5,322.9 L212.7,322.1 L212.7,318.2 L206.3,319.2 L204.1,323.3 L198.6,326.3 L198.6,321.8 L199.7,319.8 L194.6,314.3 L196.5,308.9 L195.3,302.6 L199.8,298.5 L200.4,291.7 L202.9,287.6 L203.7,281.0 L202.0,276.1 L208.4,270.7 L212.6,270.5 L214.0,269.3 L214.8,264.2 L214.4,257.6 L216.8,255.2 L221.5,256.4 L223.2,253.4 L224.3,246.4 L213.7,239.0 L212.5,233.3 L213.2,223.9 L215.1,216.5 L214.7,209.2 L218.6,209.9 L221.7,206.4 L221.1,201.4 L208.8,200.0 L198.1,197.0 L199.8,192.3 L198.4,184.2 L203.3,179.8 L200.2,175.6 L188.9,179.9 L176.5,180.9 L170.3,178.2 L174.6,167.2 L181.1,163.9 L181.1,157.6 L180.3,154.6 L173.8,151.4 L173.8,148.3 L149.2,155.2 L151.2,146.4 L148.2,140.0 L145.1,138.2 L149.3,138.6 L151.8,140.8 L154.7,139.5 L162.1,134.5 L167.2,134.4 L174.4,129.0 L179.8,121.6 L184.6,122.1 L192.1,120.9 L192.8,115.7 L194.9,114.0 L195.4,109.9 L208.2,112.8 L217.4,110.9 L223.0,107.3 L225.6,104.5 L227.9,107.1 L244.5,108.8 L253.7,106.4 L252.4,109.8 L250.1,111.8 L245.1,113.3 L239.5,118.0 L232.7,122.0 L233.1,123.6 L221.6,128.5 L222.8,133.5 L226.4,135.8 L228.9,141.3 L231.8,140.4 L235.2,136.7 L240.9,134.6 L241.3,138.6 L243.0,140.6 L239.7,143.1 L237.6,142.4 L234.6,146.2 L234.7,149.4 L230.1,150.8 L225.3,150.2 L225.2,151.9 L228.4,156.6 L234.5,155.3 L235.8,160.4 L240.2,158.2 L239.9,152.2 L246.3,148.5 L250.4,142.7 L254.3,140.4 L258.3,143.3 L266.3,143.6 L271.5,137.9 L270.5,134.8 L266.0,127.2 L263.2,125.9 L260.5,122.4 L259.8,118.2 L257.6,115.5 L267.8,114.4 L273.4,112.1 L278.4,118.4 L284.4,119.8 L294.1,118.1 L294.6,123.0 Z M202.6,191.3 L203.2,189.8 L200.9,190.4 L201.4,191.6 Z M253.5,100.6 L255.4,102.0 L254.1,105.8 L251.2,105.4 L251.0,102.8 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>7</labelrank>
                            <iso_3166_2>CH-BE</iso_3166_2>
                            <hasc>CH.BE</hasc>
                            <alt-name>Berna|Berne</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347087</woe-id>
                            <longitude>7.65026</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Bern</woe-name>
                            <fips>SZ05</fips>
                            <latitude>46.7988</latitude>
                            <woe-label>Canton of Berne, CH, Switzerland</woe-label>
                            <postal-code>BE</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Bern</name>
                            <hc-key>ch-be</hc-key>
                            <hc-a2>BE</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.BS" d="M249.3,51.3 L253.8,48.7 L267.0,44.6 L270.5,44.3 L268.4,49.8 L266.8,51.4 L262.8,51.3 L268.4,54.3 L267.3,59.2 L263.8,56.3 L259.5,57.9 L257.6,55.7 L254.7,55.2 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-BS</iso_3166_2>
                            <hasc>CH.BS</hasc>
                            <alt-name>Bâle-Ville|Basel-City|Basel-Town|Basilea-Citad|Basilea Ciudad|Basilea cittŕ|Basiléia cidade</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347086</woe-id>
                            <longitude>7.5898</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Basel-Stadt</woe-name>
                            <fips>SZ03</fips>
                            <latitude>47.5605</latitude>
                            <woe-label>Canton of Basel-City, CH, Switzerland</woe-label>
                            <postal-code>BS</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Basel-Stadt</name>
                            <hc-key>ch-bs</hc-key>
                            <hc-a2>BS</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.SO" d="M228.6,80.1 L231.4,79.0 L233.6,76.2 L237.4,79.0 L238.7,82.9 L236.4,84.4 L227.9,84.6 L227.9,84.5 L227.9,84.5 Z M294.1,118.1 L284.4,119.8 L278.4,118.4 L273.4,112.1 L267.8,114.4 L257.6,115.5 L259.8,118.2 L260.5,122.4 L263.2,125.9 L266.0,127.2 L270.5,134.8 L271.5,137.9 L266.3,143.6 L258.3,143.3 L254.3,140.4 L250.4,142.7 L246.3,148.5 L239.9,152.2 L240.2,158.2 L235.8,160.4 L234.5,155.3 L228.4,156.6 L225.2,151.9 L225.3,150.2 L230.1,150.8 L234.7,149.4 L234.6,146.2 L237.6,142.4 L239.7,143.1 L243.0,140.6 L241.3,138.6 L240.9,134.6 L235.2,136.7 L231.8,140.4 L228.9,141.3 L226.4,135.8 L222.8,133.5 L221.6,128.5 L233.1,123.6 L232.7,122.0 L239.5,118.0 L245.1,113.3 L250.1,111.8 L252.4,109.8 L253.7,106.4 L254.1,105.8 L255.4,102.0 L253.5,100.6 L249.7,96.1 L247.2,94.7 L243.1,94.4 L235.8,92.3 L238.2,88.7 L241.4,88.5 L246.4,90.4 L249.0,89.4 L251.9,85.6 L257.3,84.6 L256.9,81.7 L261.2,81.2 L263.1,79.3 L264.9,74.4 L262.2,71.9 L263.2,69.4 L268.5,69.6 L270.8,67.8 L277.2,71.9 L278.1,73.4 L274.6,77.6 L273.5,83.5 L271.5,85.4 L266.4,86.8 L266.6,91.6 L268.7,95.4 L274.1,95.0 L277.8,96.0 L283.6,100.3 L288.7,102.4 L291.8,96.8 L301.7,92.3 L303.5,88.3 L310.7,87.2 L314.5,84.0 L313.2,79.9 L314.8,76.1 L318.5,78.1 L318.7,82.1 L322.4,88.1 L325.7,89.6 L325.9,93.8 L320.8,103.8 L318.5,105.1 L306.4,102.7 L299.5,108.8 Z M237.6,68.2 L240.8,69.4 L243.7,65.7 L250.2,66.9 L250.9,74.3 L241.2,76.2 L238.7,76.1 L237.7,73.2 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-SO</iso_3166_2>
                            <hasc>CH.</hasc>
                            <alt-name>Solothurn</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347100</woe-id>
                            <longitude>7.41999</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Solothurn</woe-name>
                            <fips>SZ18</fips>
                            <latitude>47.4325</latitude>
                            <woe-label>Canton of Solothurn, CH, Switzerland</woe-label>
                            <postal-code>SO</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Solothurn</name>
                            <hc-key>ch-so</hc-key>
                            <hc-a2>SO</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.NW" d="M392.5,211.7 L396.8,213.6 L394.1,217.6 L392.2,223.4 L393.8,227.4 L393.4,229.6 L388.4,231.1 L385.3,229.9 L381.4,230.9 L380.0,229.7 L384.4,228.3 L381.6,225.7 L377.1,219.5 L375.3,209.0 L377.1,207.6 L377.7,211.0 L381.5,209.0 L385.1,211.9 Z M376.4,226.4 L369.6,229.0 L364.4,232.6 L361.3,233.1 L350.3,231.1 L344.0,233.0 L341.0,231.8 L334.3,227.2 L326.5,226.2 L329.0,222.2 L327.0,214.8 L330.1,207.5 L331.8,201.6 L334.4,199.2 L337.2,200.1 L344.1,192.6 L343.6,188.4 L346.6,186.2 L355.1,185.4 L360.7,183.8 L367.4,186.5 L364.9,193.4 L370.2,197.0 L371.3,198.6 L371.2,204.6 L370.2,208.2 L369.7,214.8 L370.1,220.1 L373.2,224.5 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-OW</iso_3166_2>
                            <hasc>CH.NW</hasc>
                            <alt-name>Obvaldo|Obwald|Unterwalden-le-Haut|Obwaldo|Sursilvania</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347096</woe-id>
                            <longitude>8.20594</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Obwalden</woe-name>
                            <fips>SZ14</fips>
                            <latitude>46.8686</latitude>
                            <woe-label>Canton of Obwalden, CH, Switzerland</woe-label>
                            <postal-code>NW</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Obwalden</name>
                            <hc-key>ch-nw</hc-key>
                            <hc-a2>NW</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.AI" d="M524.1,122.9 L519.7,111.6 L520.6,105.0 L524.1,101.7 L525.7,98.0 L526.8,92.6 L543.0,100.2 L547.9,100.3 L545.4,113.0 L542.4,118.6 L540.3,121.0 L535.2,124.2 L530.9,125.8 L528.6,125.5 Z M555.8,90.4 L553.6,89.3 L547.6,91.3 L548.0,88.7 L551.4,87.0 L551.3,84.0 L553.8,82.2 L556.1,84.6 Z M566.0,78.6 L562.6,82.1 L562.0,84.3 L557.2,81.9 L556.9,80.5 L562.1,80.2 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-AI</iso_3166_2>
                            <hasc>CH.AI</hasc>
                            <alt-name>Appenzell Inner-Rhoden|Appenzell Inner Rhodes|Appenzell dador|Appenzell Rhodes Intérieures|Appenzello Interno</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347092</woe-id>
                            <longitude>9.395479999999999</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Appenzell Innerrhoden</woe-name>
                            <fips>SZ10</fips>
                            <latitude>47.3092</latitude>
                            <woe-label>Canton of Appenzell Inner-Rhodes, CH, Switzerland</woe-label>
                            <postal-code>AI</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Appenzell Innerrhoden</name>
                            <hc-key>ch-ai</hc-key>
                            <hc-a2>AI</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.GE" d="M26.5,321.2 L34.9,328.6 L35.3,328.6 L32.5,335.5 L31.1,343.9 L27.8,349.8 L35.8,342.4 L42.6,330.1 L44.5,336.2 L46.7,338.0 L50.4,337.5 L51.1,342.6 L46.9,346.8 L36.7,353.0 L28.4,362.0 L23.3,364.4 L18.1,361.9 L11.0,361.9 L3.9,363.3 L0.0,365.4 L4.1,356.5 L0.0,349.8 L0.7,347.1 L4.6,344.9 L14.1,340.6 L17.9,341.1 L21.4,340.2 L22.2,334.2 L24.1,326.2 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-GE</iso_3166_2>
                            <hasc>CH.GE</hasc>
                            <alt-name>Cenevre|Genebra|Geneve|Geneva|Genevra|Genf|Ginebra|Ginevra</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347089</woe-id>
                            <longitude>6.11764</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Genčve</woe-name>
                            <fips>SZ07</fips>
                            <latitude>46.237</latitude>
                            <woe-label>Canton of Geneva, CH, Switzerland</woe-label>
                            <postal-code>GE</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Genčve</name>
                            <hc-key>ch-ge</hc-key>
                            <hc-a2>GE</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.JU" d="M143.3,137.4 L146.7,132.4 L151.3,128.0 L161.8,120.7 L161.4,115.1 L162.5,110.5 L165.4,107.6 L167.6,107.2 L169.9,104.2 L174.5,102.1 L175.8,99.7 L169.8,93.3 L167.0,94.6 L148.8,95.9 L149.7,93.0 L154.0,86.7 L157.9,84.5 L158.3,80.3 L162.3,79.5 L167.1,76.3 L168.3,74.4 L165.8,66.1 L171.4,64.0 L178.1,66.1 L185.7,65.0 L193.2,67.4 L197.4,67.1 L194.4,73.3 L195.2,77.0 L202.9,80.6 L206.7,83.1 L212.5,80.7 L220.8,80.2 L221.6,81.3 L227.8,84.5 L227.8,84.7 L227.9,84.7 L227.9,84.6 L231.9,88.0 L233.1,91.5 L235.8,92.3 L243.1,94.4 L247.2,94.7 L249.7,96.1 L253.5,100.6 L251.0,102.8 L251.2,105.4 L254.1,105.8 L253.7,106.4 L244.5,108.8 L227.9,107.1 L225.6,104.5 L223.0,107.3 L217.4,110.9 L208.2,112.8 L195.4,109.9 L194.9,114.0 L192.8,115.7 L192.1,120.9 L184.6,122.1 L179.8,121.6 L174.4,129.0 L167.2,134.4 L162.1,134.5 L154.7,139.5 L151.8,140.8 L149.3,138.6 L145.1,138.2 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-JU</iso_3166_2>
                            <hasc>CH.JU</hasc>
                            <alt-name>Giura</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347108</woe-id>
                            <longitude>7.19817</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Jura</woe-name>
                            <fips>SZ26</fips>
                            <latitude>47.3636</latitude>
                            <woe-label>Canton of Jura, CH, Switzerland</woe-label>
                            <postal-code>JU</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Jura</name>
                            <hc-key>ch-ju</hc-key>
                            <hc-a2>JU</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.NE" d="M145.1,138.2 L148.2,140.0 L151.2,146.4 L149.2,155.2 L173.8,148.3 L173.8,151.4 L180.3,154.6 L181.1,157.6 L181.1,163.9 L174.6,167.2 L170.3,178.2 L158.5,187.4 L152.4,192.1 L147.4,196.0 L130.2,209.4 L127.9,203.7 L127.4,198.0 L125.0,194.6 L124.6,188.3 L115.4,193.5 L108.8,198.3 L104.1,199.7 L91.4,206.0 L80.7,206.5 L81.6,202.1 L78.7,193.6 L81.3,185.8 L88.8,181.7 L105.5,177.0 L116.0,169.6 L119.6,164.6 L117.9,160.4 L121.5,155.5 L125.4,154.3 L128.8,151.4 L128.8,147.6 L133.4,146.1 L143.3,137.4 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-NE</iso_3166_2>
                            <hasc>CH.NE</hasc>
                            <alt-name>Neuenburg</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347094</woe-id>
                            <longitude>6.76076</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Neuchâtel</woe-name>
                            <fips>SZ12</fips>
                            <latitude>46.9893</latitude>
                            <woe-label>Canton of Neuchatel, CH, Switzerland</woe-label>
                            <postal-code>NE</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Neuchâtel</name>
                            <hc-key>ch-ne</hc-key>
                            <hc-a2>NE</hc-a2>
                        </desc>
                    </path>

                    <path fill="#CEE3F5" stroke="#6E6E6E" strokeWidth="0.4" id="CH.AG" d="M382.7,147.4 L378.3,147.2 L374.5,144.1 L372.3,140.4 L365.1,119.1 L363.4,117.0 L358.3,116.1 L355.7,119.1 L351.5,127.0 L347.6,129.0 L345.0,127.1 L344.1,124.0 L337.0,122.8 L334.7,120.3 L324.1,124.3 L320.8,117.5 L314.6,116.6 L314.4,121.2 L313.2,123.4 L309.3,124.7 L305.8,124.7 L296.5,126.4 L294.6,123.0 L294.1,118.1 L299.5,108.8 L306.4,102.7 L318.5,105.1 L320.8,103.8 L325.9,93.8 L325.7,89.6 L322.4,88.1 L318.7,82.1 L318.5,78.1 L314.8,76.1 L312.9,74.8 L312.6,70.2 L308.0,69.7 L299.1,56.2 L295.6,56.0 L294.8,59.7 L290.9,63.1 L288.8,63.3 L288.1,58.9 L280.6,54.8 L286.6,53.6 L289.4,52.1 L294.7,44.9 L296.8,46.1 L306.6,46.8 L308.6,52.9 L328.4,53.2 L335.2,51.8 L340.5,46.3 L346.6,43.7 L349.2,41.1 L360.1,39.8 L365.8,41.2 L368.5,46.5 L375.7,49.1 L385.8,49.2 L382.0,56.1 L378.7,59.4 L376.2,63.5 L375.3,70.0 L376.1,73.1 L380.5,83.8 L382.9,87.4 L377.8,94.5 L382.8,98.1 L382.4,102.7 L384.6,106.2 L389.2,104.8 L388.7,107.0 L384.4,113.1 L379.5,115.2 L383.2,124.3 L380.9,130.1 L381.7,139.6 Z">
                        <desc xmlns="http://www.highcharts.com/svg/namespace">
                            <labelrank>9</labelrank>
                            <iso_3166_2>CH-AG</iso_3166_2>
                            <hasc>CH.AG</hasc>
                            <alt-name>Argovia|Arg˘via|Argovie</alt-name>
                            <country>Switzerland</country>
                            <type-en>Canton</type-en>
                            <region>NULL</region>
                            <woe-id>2347083</woe-id>
                            <longitude>8.199949999999999</longitude>
                            <subregion>NULL</subregion>
                            <woe-name>Aargau</woe-name>
                            <fips>SZ01</fips>
                            <latitude>47.4176</latitude>
                            <woe-label>Canton of Aargau, CH, Switzerland</woe-label>
                            <postal-code>AG</postal-code>
                            <type>Canton|Kanton|Chantun</type>
                            <name>Aargau</name>
                            <hc-key>ch-ag</hc-key>
                            <hc-a2>AG</hc-a2>
                        </desc>
                    </path>
                </g>

                <g pointerEvents="all">
                    <circle
                        id="lausanne"
                        fill="#FF0000"
                        cx="96.571426"
                        cy="274.85715"
                        r="4.5714288"
                        className="city"
                        onMouseOver={mouseOver}
                        onMouseOut={mouseOut}
                    />
                    <circle
                        id="zurich"
                        fill="#FF0000"
                        cx="370.85715"
                        cy="100.57143"
                        r="4.5714288"
                        className="city"
                        onMouseOver={mouseOver}
                        onMouseOut={mouseOut}
                    />
                </g>



            </svg>
        </>
    )
}