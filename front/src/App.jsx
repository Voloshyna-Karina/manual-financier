import "./App.css"
import {Routes, Route} from 'react-router-dom';
// import logo from "./logo.svg"
import MainPage from "./components/MainPage/MainPage.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>} />
        </Routes>
    )
}

export default App
