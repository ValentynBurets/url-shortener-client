import React, { createElement, FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import BadRequest from "../Message/BadRequest";

interface AuthorizedRouteProps extends RouteProps {
  role: string;
  component: any;
}

const AuthorizedRoute: FC<AuthorizedRouteProps> = ({
  role,
  component,
  ...params
}) => {
  const { user } = useAuth();

  const reactComponent = createElement(component);

  return (
    <Route
      {...params}
      render={() =>
        user.auth ? (
          user.role === role || role === "All" ? (
            reactComponent
          ) : (
            <BadRequest show={true} text={`Your role is not a ${role}`} />
          )
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AuthorizedRoute;
