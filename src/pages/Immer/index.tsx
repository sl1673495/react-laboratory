import React, {useState, useEffect} from 'react'
import produce from 'immer'
import Intro from '@/components/Intro'

function createItems() {
  return Array(9)
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
    const newItems = produce(items, draft => {
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
    const newItems = produce(items, draft => {
      draft.splice(0, 1)
    })
    console.log('newItems: ', newItems)
    setItems(newItems)
  }

  const changeDeep = () => {
    const newItems = produce(items, draft => {
      draft[0].deep.test = 999
    })
    setItems(newItems)
  }

  useEffect(() => {
    console.log('items0的引用改变啦')
  }, [items[0]])

  useEffect(() => {
    console.log('items1的引用改变啦')
  }, [items[1]])

  useEffect(() => {
    console.log('测试深层变化路径：items[0]')
  }, [items[0]])

  useEffect(() => {
    console.log('测试深层变化路径：items[0].deep')
  }, [items[0].deep])

  return (
    <div>
      <Intro>
        React在一个组件进行重渲染的时候，会递归的对所有以{`<Child />`}形式声明的
        子组件进行重新渲染。
        <br />
        但是如果是组件内部是以{`{children}`}
        的形式声明子组件，则可以避免所有子组件重新渲染，此时因为子组件是从外部传入的jsx
        element，所以不会递归渲染。这在使用Provider的模式下尤其重要。
      </Intro>
      <button onClick={addAndChange}>加一个改一个</button>
      <button onClick={deleteItem}>删除第一个</button>
      <button onClick={changeDeep}>测试深层变化的路径</button>
      {items.map(item => {
        return <Child key={item.id} item={item} />
      })}
    </div>
  )
}
