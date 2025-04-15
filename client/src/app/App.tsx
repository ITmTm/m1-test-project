import { Routes, Route } from 'react-router-dom';
import ListPage from '../pages/listPage/ListPage';
import SinglePage from '../pages/singlePage/SinglePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/:id" element={<SinglePage />} />
    </Routes>
  );
}

export default App;
