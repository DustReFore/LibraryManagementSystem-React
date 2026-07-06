import HomePage from "./Pages/HomePage";
import BooksPage from "./Pages/BooksPage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BooksPage />} />
            </Routes>
        </>
    );
}
export default App
