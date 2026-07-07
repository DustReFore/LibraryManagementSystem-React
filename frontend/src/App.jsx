import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

import HomePage from "./Pages/HomePage";
import BooksPage from "./Pages/BooksPage";
import BookFormPage from "./Pages/BookFormPage.jsx";
import AuthorsPage from "./Pages/AuthorsPage.jsx";
import AuthorFormPage from "./Pages/AuthorFormPage.jsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/add" element={<BookFormPage />} />
                <Route path="/books/edit/:id" element={<BookFormPage />} />
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/authors/add" element={<AuthorFormPage />} />
                <Route path="/authors/edit/:id" element={<AuthorFormPage />} />
            </Routes>
        </>
    );
}
export default App;
