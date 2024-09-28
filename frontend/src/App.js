import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import FindId from "./pages/user/FindId";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import MyPage from "./pages/my/MyPage";
import MyInfo from "./pages/my/MyInfo"
import MyPost from "./pages/my/MyPost";
import MyComment from "./pages/my/MyComment";
import Bookmark from "./pages/my/Bookmark";
import Post from "./pages/post/post";
import Posts from "./pages/post/posts";
import Write from "./pages/post/write";
import PostItem from "./pages/post/postItem";
import Edit from "./pages/post/edit";
import CommentItem from "./pages/post/commentItem";
function App(props) {
  return (
      <>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/jwt-login/find-id" element={<FindId/>} />
          <Route path="/jwt-login/login" element={<Login/>}/>
          <Route path="/jwt-login/join" element={<SignUp/>}/>
          <Route path="/myPage" element={<MyPage/>}/>
          <Route path="/myInfo" element={<MyInfo/>}/>
          <Route path="/myPost" element={<MyPost/>}/>
          <Route path="/myComment" element={<MyComment/>}/>
          <Route path="/bookmark" element={<Bookmark/>}/>
          <Route path="/post/:postId" element={<Post/>}/>
          <Route path="/posts" element={<Posts/>}/>
          <Route path="/post/create" element={<Write/>}/>
          <Route path="/post/:postId/edit" element={<Edit/>}/>
        </Routes>
      </>
  );
}
export default App;