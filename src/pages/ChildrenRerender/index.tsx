/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState, FC, useContext } from 'react'
import { useRenderTimes } from '@/utils/use-render-times'
import Intro from '@/components/Intro'

interface ChildProps {
  foo?: number
}

function Child(props: ChildProps) {
  const times = useRenderTimes()
  return (
    <section>
      child has props foo: {props.foo} render times {times}
    </section>
  )
}

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

function BadCase() {
  const [state, setState] = useState(0)
  const render = () => setState((prev) => prev + 1)
  return (
    <article>
      <Pure />
      <Child foo={state} />
      <section>
        <button onClick={render}>渲染</button>
      </section>
    </article>
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
      <Intro>
        React在一个组件进行重渲染的时候，会递归的对所有以{'<Child />'}形式声明的
        子组件进行重新渲染。
        <br />
        但是如果是组件内部是以{'{children}'}
        的形式声明子组件，则可以避免所有子组件重新渲染，此时因为子组件是从外部传入的jsx
        element，所以不会递归渲染。这在使用Provider的模式下尤其重要。
      </Intro>
      <h1>Bad Case</h1>
      <section>
        <BadCase />
      </section>
      <h1>Good Case</h1>
      <section>
        <GoodCase />
      </section>
    </React.Fragment>
  )
}
