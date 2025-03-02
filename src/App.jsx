import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { MovieProvider } from "./contexts/MovieContext";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

const Favorites = lazy(() => import("./pages/Favorites"));
const History = lazy(() => import("./pages/History"));

const App = () => {
  return (
    <MovieProvider>
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            }
          />
          <Route
            path="/favorites"
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading Favorites...</div>}>
                  <Favorites />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/history"
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading History...</div>}>
                  <History />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </main>
    </MovieProvider>
  );
};

export default App;
