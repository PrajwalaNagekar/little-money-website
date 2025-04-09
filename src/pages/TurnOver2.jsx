import React from 'react'
import SEO from '../common/SEO'
import ColorSwitcher from '../elements/switcher/ColorSwitcher'
import HeaderTwo from '../common/header/HeaderTwo'
import TurnOverForm2 from './TurnOverForm2'
import TopNavbar from './TopNavbar'
const TurnOver2 = () => {
  return (
    <div>
                <SEO title="Home" />
                {/* <ColorSwitcher /> */}
                {/* <TopNavbar/> */}
            <HeaderTwo />

            <main className="main-wrapper">
<TurnOverForm2/>
                </main>
        
    </div>
  )
}

export default TurnOver2