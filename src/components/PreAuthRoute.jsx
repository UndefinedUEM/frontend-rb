import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const PreAuthRoute = ({ children }) => {
  const isDeviceAuthorized = localStorage.getItem('deviceAuthorized') === 'true';

  if (!isDeviceAuthorized) {
    return <Navigate to="/authorize" replace />;
  }

  return children || <Outlet />;
};

PreAuthRoute.propTypes = {
  children: PropTypes.node,
};

export default PreAuthRoute;