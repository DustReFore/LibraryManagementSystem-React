import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    );
}
export default App
