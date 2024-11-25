import { Routes, Route, useLocation } from 'react-router-dom';
import Board from './Board';
import CommentPage from './CommentPage';

function RoutingSwitch() {
  let location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Board />} />
      <Route path="/comments/:id" element={<CommentPage />} />
    </Routes>
  );
}

export default RoutingSwitch;
