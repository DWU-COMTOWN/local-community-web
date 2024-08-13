import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Bookmark from "./pages/my/Bookmark";
import MyInfo from "./pages/my/MyInfo";
import MyPost from "./pages/my/MyPost";
import MyComment from "./pages/my/MyComment";
import Header from "./components/my/Header";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/myComment" element={<MyComment />} />
          <Route path="/myPost" element={<MyPost />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/myInfo" element={<MyInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
