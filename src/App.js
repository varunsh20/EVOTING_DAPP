import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import "./App.css";
import Body from "./components/Body";
import ElectionPage from "./components/Campaign";
import Vote from "./components/Vote";
import {Routes,Route,BrowserRouter} from "react-router-dom";

function App(){

  return (
    <>
    <BrowserRouter>
    <Navbar/>
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/home" element={<Body />} />
            <Route path="/election" element={<ElectionPage />} />
            <Route path="/vote" element={<Vote />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
