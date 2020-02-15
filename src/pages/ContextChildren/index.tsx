import React, { useContext } from 'react'

const Context = React.createContext(0)

function Child() {
  const count = useContext(Context)
  return <span>count is {count}</span>
}

export default function ContextChildren() {
  const [count, setCount] = React.useState(0)
  return (
    <Context.Provider value={count}>
        <Child />
    </Context.Provider>
  )
}
