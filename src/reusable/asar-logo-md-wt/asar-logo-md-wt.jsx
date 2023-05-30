import React from "react";
import { Link } from 'react-router-dom';

import { ReactComponent as AsArLogoMdWt } from '../../assets/asar-logo-md-wt.svg'

import './asar-logo-md-wt.styles.scss'

const Header = () => (
    <div>
        <Link to="/">
            <AsArLogoMdWt className="asar-logo-md-wt"/>
        </Link>
    </div>
);

export default Header;