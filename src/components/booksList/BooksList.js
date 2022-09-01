
import { useEffect, useCallback } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {selector, fetchBooks, deleteBook} from './booksSlice';
import BooksItem from "../booksItem/BooksItem";
import Spinner from "../spinner/Spinner";

const BooksList = () => {
    const booksLoadingStatus = useSelector(state => state.books.booksLoadingStatus);
    const dispatch = useDispatch();
    const books = useSelector(selector.selectAll);
   
    useEffect(() => {
        dispatch(fetchBooks());
    }, [])

    const onDelete = useCallback((id) => {
        dispatch(deleteBook(id))
    }, [])


    if (booksLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (booksLoadingStatus === 'error') {
        return <h5>Произошла ошибка</h5>
    }

    const renderBooksList = (arr) => {
        return arr.map(({id, ...props}) => {
            return (
                <BooksItem {...props} key={id} onDelete={() => onDelete(id)}/>
            )
        })
    }

    const elements = renderBooksList(books);

    
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default BooksList;