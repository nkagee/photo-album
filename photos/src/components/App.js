import "../App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./common/Header";
import NotFound from "./common/NotFound";
import AlbumList from "./album-list/AlbumList";
import Album from "./album/Album";

function App() {
  return (
    <div className="album-app" role="application">
      <Header />

      <div className="album-body" role="region">
        <Routes>
          <Route path="/albums" element={<AlbumList />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/" element={<Navigate to="/albums" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
