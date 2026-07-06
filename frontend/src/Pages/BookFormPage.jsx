function BookFormPage() {
    return (
        <div>
            <div className="container my-5">
                <h1 th:text="${formTitle}"></h1>

                <form th:action="@{${formAction}}" th:object="${book}" method="post" className="mt-4">

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" th:field="*{title}" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <select className="form-select" id="author" th:field="*{author.id}">
                            <option th:each="a : ${authors}"
                                    th:value="${a.id}"
                                    th:text="${a.firstName + ' ' + a.lastName}">
                            </option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="year" className="form-label">Year</label>
                        <input type="number" className="form-control" id="year" th:field="*{year}" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className="form-control" id="category" th:field="*{category.name}" required/>
                    </div>

                    <button type="submit" className="btn btn-success" th:text="${submitText}"></button>
                    <a th:href="@{/books}" className="btn btn-secondary">Cancel</a>
                </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
        </div>
    )
}
export default BookFormPage;