import React from "react";
import { Routes, Route } from "react-router-dom";

import QuotifyPageHome from "./pages/home/home";
import QuotifyMainCreate from "./pages/create/create";
import QuotifyPageLibrary from "./pages/library/library";
import LikedPageQuotify from "./pages/liked/liked";
import ListPageQuotify from "./pages/list/list";
import QuotifyPageAccount from "./pages/account/account";

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<QuotifyPageHome />} />
      <Route path="/create" element={<QuotifyMainCreate />} />
      <Route path="/library" element={<QuotifyPageLibrary />} />
      <Route path="/liked" element={<LikedPageQuotify />} />
      <Route path="/list" element={<ListPageQuotify />} />
      <Route path="/account" element={<QuotifyPageAccount />} />
    </Routes>
  </div>
);

export default App;
