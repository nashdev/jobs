import React from "react";
import { IndexRoute, Route } from "react-router";
import App from "./components/App";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Account/Login";
import Signup from "./components/Account/Signup";
import Profile from "./components/Account/Profile";
import Forgot from "./components/Account/Forgot";
import Reset from "./components/Account/Reset";
import CompanyList from "./components/Companies/List";
import CompanyAdd from "./components/Companies/Add";
import CompanyEdit from "./components/Companies/Edit";
import CompanyView from "./components/Companies/View";
import CompanyDelete from "./components/Companies/Delete";
import JobList from "./components/Jobs/List";
import JobAdd from "./components/Jobs/Add";
import JobEdit from "./components/Jobs/Edit";
import JobView from "./components/Jobs/View";
import JobDelete from "./components/Jobs/Delete";
import PeopleList from "./components/People/List";
import Conduct from "./components/Pages/Conduct";
import { Terms, Privacy } from "./components/Pages";

export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace("/login");
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace("/");
    }
  };
  const clearMessages = () => {
    store.dispatch({
      type: "CLEAR_MESSAGES"
    });
  };
  return (
    <Route path="/" breadcrumbName="Home" component={App}>
      <IndexRoute component={Home} onLeave={clearMessages} />
      <Route
        breadcrumbName="Login"
        path="/login"
        component={Login}
        onEnter={skipIfAuthenticated}
        onLeave={clearMessages}
      />
      <Route
        breadcrumbName="Signup"
        path="/signup"
        component={Signup}
        onEnter={skipIfAuthenticated}
        onLeave={clearMessages}
      />
      <Route
        breadcrumbName="My Account"
        path="/account"
        component={Profile}
        onEnter={ensureAuthenticated}
        onLeave={clearMessages}
      />
      <Route
        breadcrumbName="Forgot Password"
        path="/forgot"
        component={Forgot}
        onEnter={skipIfAuthenticated}
        onLeave={clearMessages}
      />
      <Route
        breadcrumbName="Reset Password"
        path="/reset/:token"
        component={Reset}
        onEnter={skipIfAuthenticated}
        onLeave={clearMessages}
      />
      <Route path="/jobs(/list/:page)" breadcrumbName="Job Listings">
        <IndexRoute component={JobList} onLeave={clearMessages} />
        <Route
          breadcrumbName="Add Job"
          path="/jobs/add"
          component={JobAdd}
          onEnter={ensureAuthenticated}
        />

        <Route
          breadcrumbName="Profile"
          path="/jobs/:id"
          component={JobView}
          onLeave={clearMessages}
        />

        <Route
          breadcrumbName="Edit Job"
          path="/jobs/:id/edit"
          component={JobEdit}
          onEnter={ensureAuthenticated}
        />
        <Route
          breadcrumbName="Delete Job"
          path="/jobs/:id/delete"
          component={JobDelete}
          onEnter={ensureAuthenticated}
        />
      </Route>

      <Route path="/companies" breadcrumbName="Companies">
        <IndexRoute component={CompanyList} onLeave={clearMessages} />
        <Route
          breadcrumbName="Add Company"
          path="/companies/add"
          component={CompanyAdd}
          onEnter={ensureAuthenticated}
        />

        <Route
          breadcrumbName="Profile"
          path="/companies/:id"
          component={CompanyView}
          onLeave={clearMessages}
        />

        <Route
          breadcrumbName="Edit Company"
          path="/companies/:id/edit"
          component={CompanyEdit}
          onLeave={clearMessages}
          onEnter={ensureAuthenticated}
        />
        <Route
          breadcrumbName="Delete Company"
          path="/companies/:id/delete"
          component={CompanyDelete}
          onEnter={ensureAuthenticated}
        />
      </Route>

      <Route
        breadcrumbName="People"
        path="/people"
        component={PeopleList}
        onLeave={clearMessages}
      />
      <Route
        breadcrumbName="Terms of Service"
        path="/tos"
        component={Terms}
        onLeave={clearMessages}
      />
      <Route
        breadcrumbName="Privacy Policy"
        path="/privacy"
        component={Privacy}
        onLeave={clearMessages}
      />
      <Route
        breadcrumbName="Code of Conduct"
        path="/conduct"
        component={Conduct}
        onLeave={clearMessages}
      />

      <Route path="*" component={NotFound} onLeave={clearMessages} />
    </Route>
  );
}
