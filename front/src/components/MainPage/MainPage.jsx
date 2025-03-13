import Header from "../Header/Header.jsx";
import './MainPage.css';
import SideBar from "../SideBar/SideBar.jsx";

const MainPage = () => {

    return (
        <div className={"main-page"}>
            <SideBar/>

            {/*<div className={"sidebar-content"}>*/}
            {/*    <StartForm/>*/}
            {/*</div>*/}
            {/*<Header/>*/}
            {/*<div className={"container-form"}>*/}
            {/*    <StartForm/>*/}
            {/*</div>*/}
            {/*<div className={"container-form"}>*/}
            {/*    <Calculator/>*/}
            {/*</div>*/}
        </div>
    )
}

export default MainPage;