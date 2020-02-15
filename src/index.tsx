import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom'
import './index.css'

const pages = require.context('./pages', true, /index.tsx/)

const components = pages.keys().map(path => {
  const nameReg = /(\.\/(.*)\/index.tsx)/
  const match = path.match(nameReg)
  if (!match) {
    throw new Error(
      'component path must be like [name]/index.tsx, please check',
    )
  }
  const name = match[2]
  return {
    name,
    component: pages(path).default as React.ComponentType,
  }
})

type Components = typeof components

function registerLinks(components: Components) {
  return components.map(({name}) => {
    return (
      <NavLink className="App-link" key={name} to={`/${name}`}>
        {name}
      </NavLink>
    )
  })
}

function registerRoutes(components: Components) {
  const [firstComponent] = components
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={`/${firstComponent.name}`} />
      </Route>
      {components.map(({name, component: Component}) => {
        return (
          <Route key={name} path={`/${name}`} exact>
            <Component />
          </Route>
        )
      })}
    </Switch>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <section className="App-content">
          <nav className="App-links">
            <header className="App-title">React Laboratory</header>
            {registerLinks(components)}
          </nav>
          <section className="App-routes">{registerRoutes(components)}</section>
        </section>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
