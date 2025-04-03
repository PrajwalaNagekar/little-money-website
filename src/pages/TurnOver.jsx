import React from 'react'
import TurnOverForm from './TurnOverForm'
import SEO from '../common/SEO'
import ColorSwitcher from '../elements/switcher/ColorSwitcher'
import FooterOne from '../common/footer/FooterOne'
import HeaderTwo from '../common/header/HeaderTwo'

const TurnOver = () => {
  return (
    <div>
        <SEO title="Home" />
            <ColorSwitcher />
            <HeaderTwo />

            <main className="main-wrapper">
            {/* <HeaderTwo /> */}
            <TurnOverForm/>
            <FooterOne parentClass="" />

            </main>
    </div>
  )
}

export default TurnOver