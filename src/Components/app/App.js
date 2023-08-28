import AppHeader from '../appHeader/AppHeader';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AppBanner,
        BreedInfoPage, 
        BreedPage, 
        DislikesPage, 
        FavouritesPage, 
        GaleryPage,
        Page404,
        LikesPage,
        SearchPage, 
        VotingPage} from "../pages";

import '../../style/style.scss';

function App() {

  return (
    <div className="App">
      <Router>
        <AppHeader/>
        <Routes>
            <Route path="/web-site" element={<AppBanner/>} />
            <Route path="/web-site/voting" element={<VotingPage/>} />
            <Route path="/web-site/breed" element={<BreedPage/>} />
            <Route path="/web-site/breed/:breedId" element={<BreedInfoPage/>} />
            <Route path="/web-site/galery" element={<GaleryPage/>} />
            <Route path="/web-site/likes" element={<LikesPage/>} />
            <Route path="/web-site/favourites" element={<FavouritesPage/>} />
            <Route path="/web-site/dislikes" element={<DislikesPage/>} />
            <Route path="/web-site/search/:searchValue" element={<SearchPage/>} />
            <Route path="/web-site/*" element={<Page404/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;