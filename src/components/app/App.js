import './app.scss'
import BooksList from "../booksList/BooksList";
import AddForm from '../addForm/AddForm';

const App = () => {

    return (

    <main className="app">
        <div className="content">
            <BooksList/>
            <AddForm/>
        </div>
    </main>
    )
}

export default App;