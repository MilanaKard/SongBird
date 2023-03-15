import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Loader from './components/Loader/Loader';

const Home = React.lazy(() => import('./components/pages/Home/Home'));
const Quiz = React.lazy(() => import('./components/pages/Quiz/Quiz'));
const Statistics = React.lazy(() => import('./components/pages/Statistics/Statistics'));
const Gallery = React.lazy(() => import('./components/pages/Gallery/Gallery'));
const NotFound = React.lazy(() => import('./components/pages/NotFound/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <React.Suspense fallback={<Loader />}>
              <Home />
            </React.Suspense>
          }
        />
        <Route
          path="quiz"
          element={
            <React.Suspense fallback={<Loader />}>
              <Quiz />
            </React.Suspense>
          }
        />
        <Route
          path="gallery"
          element={
            <React.Suspense fallback={<Loader />}>
              <Gallery />
            </React.Suspense>
          }
        />
        <Route
          path="statistics"
          element={
            <React.Suspense fallback={<Loader />}>
              <Statistics />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<Loader />}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
