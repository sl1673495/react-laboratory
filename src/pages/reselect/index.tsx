import React, {useState, useCallback} from 'react'
import {createSelector} from 'reselect'

export default () => {
  const [state, setState] = useState({
    foo: 1,
    bar: 2,
  })

  const [state2, setState2] = useState({
    foo2: 3,
    bar2: 4,
  })

  const sumSelector = useCallback(
    createSelector(
      [
        (state: any) => {
          console.log('recalc dep1')
          return state.foo
        },
        (state: any) => {
          console.log('recalc dep2')
          return state.bar
        },
      ],
      (foo, bar) => {
        console.log('bar: ', bar)
        console.log('foo: ', foo)
        console.log('recalc')
        return foo + bar
      },
    ),
    [],
  )

  const composeSelector = useCallback(
    createSelector([sumSelector, state => state.bar], (a, b) => {
      console.log('recalc sumPlusBarAgain', a, b)
      return a + b
    }),
    [],
  )

  const sum = sumSelector(state)

  const sumPlusBarAgain = composeSelector(state)

  const changeBarToRandom = () => {
    setState(prev => ({
      ...prev,
      bar: prev.bar + 1,
    }))
  }

  const changeBar2ToRandom = () => {
    state.bar = 150
    setState2(prev => ({
      ...prev,
      bar2: prev.bar2 + 1,
    }))
  }

  const changeStateReference = () => {
    setState({
      ...state,
    })
  }

  return (
    <div>
      <p>state: {JSON.stringify(state)}</p>
      <p>state2: {JSON.stringify(state2)}</p>
      <p>sum 依赖 state.foo + state.bar</p>
      <p>sum is {sum}</p>
      <p>sumPlusBarAgain is {sumPlusBarAgain}</p>
      <div>
        <button onClick={changeBarToRandom}>change state.bar plus 1</button>
      </div>
      <div>
        <button onClick={changeBar2ToRandom}>change state2.bar2 plus 1</button>
      </div>
      <div>
        <button onClick={changeStateReference}>
          change state的引用 但是内部的值不变
        </button>
      </div>
    </div>
  )
}
