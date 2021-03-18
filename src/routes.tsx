import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from './presenter/ui/App';
import AlbumDetail from './presenter/ui/pages/AlbumDetail';
import UserDetail from './presenter/ui/pages/UserDetail';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <App/>}  />
        <Route path="/album/:id" exact component={AlbumDetail} />
        <Route path="/user/:id" exact component={UserDetail} />
      </Switch>
    </BrowserRouter>
  )
}
