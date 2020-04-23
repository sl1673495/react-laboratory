import React, {ElementType} from 'react'
import './a.scss'

export default function DynamicCss() {
  // @ts-ignore
  const importB = () => import('./b.scss')
  return (
    <div>
      <span className="a b">动态样式演示</span>
      <button onClick={importB}>引入</button>
    </div>
  )
}
