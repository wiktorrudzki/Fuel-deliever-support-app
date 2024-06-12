import React from 'react';

import './Layout.css';
import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="container">
      <Sidebar />
      <div className="content-wrapper">{children}</div>
    </div>
  );
};

export default Layout;
