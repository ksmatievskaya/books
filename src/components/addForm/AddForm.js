import './addForm.scss';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { useDispatch } from 'react-redux';
import { addBook } from '../booksList/booksSlice';

const AddForm = () => {

    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const dispatch = useDispatch();;

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            title: bookTitle,
            author: bookAuthor, 
            description: bookDescription
        }

        dispatch(addBook(newHero))
        
        setBookTitle('');
        setBookAuthor('');
        setBookDescription('');
    }

    return (
        <form className="add" onSubmit={onSubmitHandler}>
            <div className="add__item">
                <label htmlFor="title" className="add__name">Название книги</label>
                <input type="text"
                        id="title"
                        name="title"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)} />
            </div>

            <div className="add__item">
                <label htmlFor="author" className='add__name'>Автор</label>
                <input type="text"
                        id="author"
                        name="author"
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)} />
            </div>

            <div className="add__item">
                <label htmlFor="author" className='add__name'>Описание</label>
                <textarea
                     name="description"
                     id="descrition"
                      cols="30"
                       rows="5"
                       value={bookDescription}
                       onChange={(e) => setBookDescription(e.target.value)}></textarea>
            </div>

            <button type='submit' className='add__btn'>Добавить</button>
        </form>
    )
}


export default AddForm;