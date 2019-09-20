import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import NotFound from './NotFound';
import StorePicker from './StorePicker';

interface IProps {}

const Router: FC<IProps> = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker}></Route>
      <Route path="/store/:storeId" component={App}></Route>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
