import React, {useState, FC, useContext} from 'react'
import {useRenderTimes} from '../../utils/use-render-times'
import Intro from '../../components/Intro'

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
    <>
      <section>Pure render times: {times}</section>
      <PureChild />
    </>
  )
}

function BadCase() {
  const [state, setState] = useState(0)
  const render = () => setState(prev => prev + 1)
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

const GoodCaseWrap: FC = ({children}) => {
  const [state, setState] = useState(0)
  const render = () => setState(prev => prev + 1)
  return (
    <GoodCaseContext.Provider value={state}>
      {children}
      <section>
        <button onClick={render}>渲染</button>
      </section>
    </GoodCaseContext.Provider>
  )
}

const GoodCase = () => {
  return (
    <GoodCaseWrap>
      <Pure />
      <GoodCaseChild />
    </GoodCaseWrap>
  )
}

export default function PropsRerender() {
  return (
    <>
      <Intro>
        React在一个组件进行重渲染的时候，会递归的对所有以{`<Child />`}
        子组件进行重新渲染，但是如果是组件内部是以{`{children}`}
        的形式声明子组件，则可以避免所有子组件重新渲染，这在用Provider包裹进行状态传递的模式下尤其重要。
      </Intro>
      <h1>Bad Case</h1>
      <section>
        <BadCase />
      </section>
      <h1>Good Case</h1>
      <section>
        <GoodCase />
      </section>
    </>
  )
}
