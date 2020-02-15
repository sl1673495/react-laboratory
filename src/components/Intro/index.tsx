import React, {FC} from 'react'
import './style.css'

const Intro: FC = ({children}) => {
  return (
    <>
      <h1>Intro</h1>
      <p className="intro-text">{children}</p>
    </>
  )
}

export default Intro
