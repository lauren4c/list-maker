import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

const Landing = () => (
  <section className="landing">
    <div className="Main-text">
      <h1>Welcome to The Ultimate Shopping list App</h1>
      <p>
        Once you <Link to="/user">create an account</Link>, you can create
        real-time shopping lists with friends and family. Add lists, add items
        to each list, and then check them off when purchase them. Try it out!
      </p>
    </div>
  </section>
);
export default Landing;
