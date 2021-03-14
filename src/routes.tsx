import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from './presenter/ui/App';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  )
}
