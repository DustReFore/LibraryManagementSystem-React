import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

import HomePage from "./Pages/HomePage";
import BooksPage from "./Pages/BooksPage";
import BookFormPage from "./Pages/BookFormPage.jsx";
import AuthorsPage from "./Pages/AuthorsPage.jsx";
import AuthorFormPage from "./Pages/AuthorFormPage.jsx";
import ReadersPage from "./Pages/ReadersPage.jsx";
import ReaderFormPage from "./Pages/ReaderFormPage.jsx";
import OrdersPage from "./Pages/OrdersPage.jsx";
import OrderFormPage from "./Pages/OrderFormPage.jsx";

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
                <Route path="/readers" element={<ReadersPage />} />
                <Route path="/readers/add" element={<ReaderFormPage />} />
                <Route path="/readers/edit/:id" element={<ReaderFormPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/add" element={<OrderFormPage />} />
                <Route path="/orders/edit/:id" element={<OrderFormPage />} />
            </Routes>
        </>
    );
}
export default App;
