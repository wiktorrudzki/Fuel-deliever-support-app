import { StationsProvider } from '@/hooks';

import './Layout.css';
import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <StationsProvider>
    <div className="container">
      <Sidebar />
      <div className="content-wrapper">{children}</div>
    </div>
  </StationsProvider>
);

export default Layout;
