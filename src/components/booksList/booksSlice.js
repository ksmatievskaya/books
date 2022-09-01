import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const booksAdapter = createEntityAdapter();

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:3001/books');
    }
)

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async (id) => {
        const {request} = useHttp();
        await request(`http://localhost:3001/books/${id}`, 'DELETE');
        return id
    }
)

export const addBook = createAsyncThunk(
    'book/addBook',
    async (newHero) => {
        const {request} = useHttp();
        await request('http://localhost:3001/books', 'POST', JSON.stringify(newHero));
        return newHero
    }
)

const initialState = booksAdapter.getInitialState({
    booksLoadingStatus: 'idle'
})

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
       bookAdded: (state, action) => {
        booksAdapter.addOne(state, action.payload)
       },
       bookDeleted: (state, action) => {
        booksAdapter.removeOne(state, action.payload)
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, state => {state.booksLoadingStatus = 'loading'})
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.booksLoadingStatus = 'idle';
                booksAdapter.setAll(state, action.payload);
            })
            .addCase(fetchBooks.rejected, state => {
                state.booksLoadingStatus = 'error'
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                booksAdapter.removeOne(state, action.payload)
            })
            .addCase(addBook.fulfilled, (state, action) => {
                booksAdapter.addOne(state, action.payload)
            })
            .addDefaultCase(() => {})
    }
})


const {reducer, actions} = booksSlice;

export const selector = booksAdapter.getSelectors(state => state.books);


export const {bookAdded, bookDeleted} = actions;

export default reducer;