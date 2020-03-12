import React, {useState} from 'react'
import {useSlice} from './use-slice'

const random = () => ({
  name: 'item',
  id: Math.random(),
})
const mock = Array(10)
  .fill(null)
  .map(random)

export default function TimeSlice() {
  const [data, setData] = useState(mock)
  const slice = useSlice(data)
  const add = () => {
    setData(prev => prev.concat(random()))
  }
  console.log('slice: ', slice)
  return (
    <div>
      <button onClick={add}>增加</button>
      <ul>
        {slice.map((item, index) => {
          return (
            <li key={item.id}>
              {index}：{item.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
