import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import GamesCatalog from "./components/game-catalog/GamesCatalog";
import GameCreate from "./components/game-create/GameCreate";
import GameDetails from "./components/game-details/GameDetails";
import AuthProvider from "./contexts/AuthProvider";
import Logout from "./components/logout/Logout";
import GameEdit from "./components/game-edit/GameEdit";
import PrivateGuard from "./components/common/PrivateGuard";

function App() {
  return (
    <AuthProvider>
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/games" element={<GamesCatalog />} />
            <Route path="/games/:gameId/details" element={<GameDetails />} />
            <Route element={<PrivateGuard />}>
              <Route path="/logout" element={<Logout />} />
              <Route path="/games/:gameId/edit" element={<GameEdit />} />
              <Route path="/games/create" element={<GameCreate />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
