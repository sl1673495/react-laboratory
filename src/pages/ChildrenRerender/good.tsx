/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState, FC, useContext } from 'react'
import { useRenderTimes } from '@/utils/use-render-times'

function PureChild() {
  const times = useRenderTimes()
  return <section>PureChild render times: {times}</section>
}

function Pure() {
  const times = useRenderTimes()
  return (
    <React.Fragment>
      <section>Pure render times: {times}</section>
      <PureChild />
    </React.Fragment>
  )
}

const GoodCaseContext = React.createContext(0)

const GoodCaseChild: FC = () => {
  const state = useContext(GoodCaseContext)
  const times = useRenderTimes()
  return (
    <section>
      child has context state: {state} render times: {times}
    </section>
  )
}

const GoodCaseWrap: FC = ({ children }) => {
  const [state, setState] = useState(0)
  const render = () => setState((prev) => prev + 1)
  return (
    <GoodCaseContext.Provider value={state}>
      {children}
      <section>
        <button onClick={render}>渲染</button>
      </section>
    </GoodCaseContext.Provider>
  )
}

const GoodCase = () => (
  <GoodCaseWrap>
    <Pure />
    <GoodCaseChild />
  </GoodCaseWrap>
)

export default function PropsRerender() {
  return (
    <React.Fragment>
      <h1>Good Case</h1>
      <section>
        <GoodCase />
      </section>
    </React.Fragment>
  )
}
