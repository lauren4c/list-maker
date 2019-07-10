import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import renderer from "react-test-renderer";
import App from "./App";
import Lists from "./components/lists";
import AddList from "./components/addlist";
import Header from "./components/header";
import Landing from "./components/landing";
import SignIn from "./components/signin";

import { AuthContext } from "./Auth";

beforeEach(() => {
  jest.resetModules();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
