import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

const Landing = () => (
  <section className="landing">
    <div className="Main-text">
      <h1>Welcome to The Ultimate List-Maker App</h1>
      <p>
        Create real-time shopping lists to share with with friends and family.
        Add lists, add items to each list, and then check it off when purchased
        or finished. Try it out! The app is free, you just need to{" "}
        <Link to="/user"> log in or create an account</Link> to get started.
      </p>
    </div>
  </section>
);
export default Landing;
