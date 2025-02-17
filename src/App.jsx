import Favorites from "./pages/Favorites";
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
        </Routes>
      </main>
    </MovieProvider>
  );
};

export default App;
