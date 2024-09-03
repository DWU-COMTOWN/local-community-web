import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import MyInfo from "./pages/my/MyInfo"
import MyPost from "./pages/my/MyPost";
import MyComment from "./pages/my/MyComment";
import Bookmark from "./pages/my/Bookmark";
import DeleteAcc from "./pages/my/DeleteAcc";
import Post from "./pages/post/Post";
import Posts from "./pages/post/Posts";
import Write from './pages/post/Write';
import Edit from "./pages/post/Edit";
import Search from "./pages/main/Search";
import BestPosts from "./pages/main/BestPosts";

function App(props) {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/myInfo" element={<MyInfo />} />
                <Route path="/myPost" element={<MyPost />} />
                <Route path="/myComment" element={<MyComment />} />
                <Route path="/bookmark" element={<Bookmark />} />
                <Route path="/deleteacc" element={<DeleteAcc />}/>
                <Route path="/post/:postId" element={<Post/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/post/create" element={<Write/>}/>
                <Route path="/post/:postId/edit" element={<Edit/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/bestPosts" element={<BestPosts/>}/>
            </Routes>
        </>
    );
}
export default App;
