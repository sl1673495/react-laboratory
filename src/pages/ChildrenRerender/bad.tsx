/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState, FC, useContext } from 'react'
import { useRenderTimes } from '@/utils/use-render-times'

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

export default function PropsRerender() {
  return (
    <React.Fragment>
      <h1>Bad Case</h1>
      <section>
        <BadCase />
      </section>
    </React.Fragment>
  )
}
