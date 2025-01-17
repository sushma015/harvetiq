import './App.css';
import { Route, Routes} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Layout from './Layout';
import CropAnalysis from './CropAnalysis';
import Blog from './Blogs';
import About from './About';
function App() {
  return (
    <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="cropanalysis" element={<CropAnalysis />} />
                    <Route path="blogs" element={<Blog />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
    </div>
  );
}

export default App;
