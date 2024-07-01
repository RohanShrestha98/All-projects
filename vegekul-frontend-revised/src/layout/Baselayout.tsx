import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import '../App.scss';

const BaseLayout = () => (
  <div className="flex flex-row justify-between">
    <Sidebar />
    <Outlet />
  </div>
);

export default BaseLayout;
