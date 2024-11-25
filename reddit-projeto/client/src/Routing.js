import { BrowserRouter as Router } from 'react-router-dom';
import Header from './header';
import RoutingSwitch from './RoutingSwitch';
import AuthModal from './AuthModal';
import PostFormModal from './PostFormModal';

function Routing() {
  return (
    <Router>
      <Header />
      <RoutingSwitch />
      <PostFormModal />
      <AuthModal />
    </Router>
  );
}

export default Routing;
