import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import React from "react";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p className="w-3 h-3.5">Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
      <div className="w-[164px] h-[133px]"></div>
    </Suspense>
  );
}

export default App;
