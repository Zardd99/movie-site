import Favorites from "./pages/Favorites";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { MovieProvider } from "./contexts/MovieContext";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <MovieProvider>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/History" element={<History />} />
        </Routes>
      </main>
    </MovieProvider>
  );
};

export default App;
