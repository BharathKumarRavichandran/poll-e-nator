import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  AllPolls as AllPollsView,
  CreatePoll as CreatePollView,
  MyPolls as MyPollsView,
  RegisteredPolls as RegisteredPollsView,
  VotedPolls as VotedPollsView,
  ViewPoll as ViewPollView,
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/polls/all"
      />
      <RouteWithLayout
        component={AllPollsView}
        exact
        layout={MainLayout}
        path="/polls/all"
      />
      <RouteWithLayout
        component={CreatePollView}
        exact
        layout={MainLayout}
        path="/polls/create"
      />
      <RouteWithLayout
        component={MyPollsView}
        exact
        layout={MainLayout}
        path="/polls/my"
      />
      <RouteWithLayout
        component={RegisteredPollsView}
        exact
        layout={MainLayout}
        path="/polls/registered"
      />
      <RouteWithLayout
        component={VotedPollsView}
        exact
        layout={MainLayout}
        path="/polls/voted"
      />
      <RouteWithLayout
        component={ViewPollView}
        exact
        layout={MainLayout}
        path="/polls/view/:pollId"
      />
      <RouteWithLayout
        component={ViewPollView}
        exact
        layout={MainLayout}
        path="/polls/vote/:pollId"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
