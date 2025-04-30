import React from 'react'
import SEO from '../common/SEO'
import ColorSwitcher from '../elements/switcher/ColorSwitcher'
import HeaderTwo from '../common/header/HeaderTwo'
import DetailsForm1 from './DetailsForm1'
const DetailsForm = () => {
  return (
    <>
      {/* <SEO title="Home" /> */}
      <ColorSwitcher />
      <main className="main-wrapper">
      {/* <HeaderTwo /> */}
      <DetailsForm1/>
      </main>
    </>
  )
}

export default DetailsForm