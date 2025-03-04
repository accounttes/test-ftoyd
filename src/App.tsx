import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
