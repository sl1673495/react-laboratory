import React, { useState, useEffect } from 'react'
import produce from 'immer'

function createItems() {
  return Array(3)
    .fill(null)
    .map((v, i) => ({
      deep: {
        test: i,
      },
      title: `item${i}`,
      id: i,
    }))
}

const Child = React.memo((props: any) => {
  console.log('rerender')
  return (
    <div>
      <h1>{props.item.title}</h1>
      <span>{props.item.deep.test}</span>
    </div>
  )
})

export default function Immer() {
  const [items, setItems] = useState(createItems)

  const addAndChange = () => {
    const newItems = produce(items, (draft) => {
      draft.push({
        deep: {
          test: 4,
        },
        id: Math.random(),
        title: 'test4',
      })
      draft[0].title = '改变啦'
    })
    setItems(newItems)
  }

  const deleteItem = () => {
    const newItems = produce(items, (draft) => {
      draft.splice(0, 1)
    })
    setItems(newItems)
  }

  const changeDeep = () => {
    const newItems = produce(items, (draft) => {
      draft[0].deep.test = 999
    })
    setItems(newItems)
  }

  useEffect(() => {
    console.log('测试变化路径：items[0]')
  }, [items[0]])

  useEffect(() => {
    console.log('测试深层变化路径：items[0].deep')
  }, [items[0].deep])

  return (
    <div>
      <button type="button" onClick={addAndChange}>加一个改一个</button>
      <button type="button" onClick={deleteItem}>删除第一个</button>
      <button type="button" onClick={changeDeep}>测试深层变化的路径</button>
      {items.map((item) => <Child key={item.id} item={item} />)}
    </div>
  )
}
