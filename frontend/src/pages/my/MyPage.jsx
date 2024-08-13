import "../../css/App.css"
import Header from "../../components/my/Header";
import Sidebar from "../../components/my/Sidebar";

function MyPage() {
    return (
        <>
            <div className="root-wrap">
                <Header />
            </div>
            <div className="side-wrap">
                <Sidebar />
            </div>
        </>
    );
}

export default MyPage;