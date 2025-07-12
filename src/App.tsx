
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import DragPage from './pages/DragPage';
import Information from './pages/Information';
import LearnTopic from './pages/LearnTopic';

function App() {


  return (

      <Router>
        <div className="App w-full ">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="information" element={<Information/>} />
            <Route path="/:id/learn" element={<LearnTopic />} />
            <Route path="/:id/learn/drag" element={<DragPage />} />
            </Route>
          </Routes>
        </div>
      </Router>

  )
}

export default App
