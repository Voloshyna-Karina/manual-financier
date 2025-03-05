import Header from "../Header/Header.jsx";
import MainForm from "../MainForm/MainForm.jsx";
import Calculator from "../Calculator/Calculator.jsx";
import './MainPage.css';

const MainPage = () => {

    return (
        <div className={"container"}>
            {/*<Header/>*/}
            <div>
                <MainForm/>
            </div>
            <div className={"container-calculator"}>
                <Calculator/>
            </div>
        </div>
    )
}

export default MainPage;