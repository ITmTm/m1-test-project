import { Routes, Route } from 'react-router-dom';
import ListPage from '../listPage/ListPage';
import SinglePage from '../singlePage/SinglePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/:id" element={<SinglePage />} />
    </Routes>
  );
}

export default App;
