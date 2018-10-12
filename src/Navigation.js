import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from './routes';
const Navigation = () =>
<div>
  <ul>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
    <li><Link to={routes.SCHOOL}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><Link to={routes.SIGN_UP}>Sign Up</Link></li>
    <li><Link to={routes.MY_SCHOOLS}>My Schools</Link></li>
    <li><Link to={routes.ADD_SCHOOL}>My Schools</Link></li>

    </ul>
</div>
export default Navigation;
