import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public portfolio view */}
        <Route path="/:slug" element={<PortfolioPage />} />

        {/* Home/redirect */}
        <Route
          path="/"
          element={
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Portfolio CMS</h1>
                <p className="text-xl mb-8">
                  Enter a portfolio slug in the URL to view a portfolio.
                </p>
                <p className="text-lg opacity-75">
                  Example: <code className="bg-black/20 px-4 py-2 rounded">/my-portfolio</code>
                </p>
              </div>
            </div>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Portfolio not found</p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
