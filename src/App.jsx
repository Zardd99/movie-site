import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { MovieProvider } from "./contexts/MovieContext";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Favorites = lazy(() => import("./pages/Favorites"));
const History = lazy(() => import("./pages/History"));

const App = () => {
  return (
    <MovieProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/favorites"
            element={
              <Suspense fallback={<div>Loading Favorites...</div>}>
                <Favorites />
              </Suspense>
            }
          />
          <Route
            path="/history"
            element={
              <Suspense fallback={<div>Loading History...</div>}>
                <History />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </MovieProvider>
  );
};

export default App;
