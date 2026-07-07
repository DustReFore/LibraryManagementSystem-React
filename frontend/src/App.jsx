import HomePage from "./Pages/HomePage";
import BooksPage from "./Pages/BooksPage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import BookFormPage from "./Pages/BookFormPage.jsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/add" element={<BookFormPage />} />
                <Route path="/books/edit/:id" element={<BookFormPage />} />
            </Routes>
        </>
    );
}
export default App
