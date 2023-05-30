import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as AsArLogoSmWt } from "../../assets/asar-logo-sm-wt.svg";

import "./asar-logo-sm-wt.styles.scss";

const Header = () => (
  <div>
    <Link to="/">
      <AsArLogoSmWt className="asar-logo-sm-wt" />
    </Link>
  </div>
);

export default Header;
