import { Routes, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import ProductPage from '../../pages/ProductPage';
import NotFound from '../../pages/NotFound';

import './App.less';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items/:id" element={<ProductPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

