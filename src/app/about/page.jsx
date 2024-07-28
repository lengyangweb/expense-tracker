import React from "react";
import Header from "../components/Header";

const AboutPage = () => {
  return (
    <div className="d-flex">
      <Header />
      <div className="d-flex w-100 flex-column align-items-center mt-3">
        <span>
          This is expense tracker web application, which is created to track all
          expenses.
        </span>
        <span className="fw-bold">Version: 1.0.0</span>
      </div>
    </div>
  );
};

export default AboutPage;
