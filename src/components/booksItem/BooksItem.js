import './booksItem.scss'

const BooksItem = ({title, author, description, onDelete}) => {


    return (
             <li className="book_item">
            <div className='book_img'>
                <img src="https://img.icons8.com/wired/64/000000/question-mark.png"
                alt="нет обложки"/>
            </div>
            <div className="book_body">
                <h3 className="book_title">{title}</h3>
                <h4 className="book_author">{author}</h4>
                <p className="book_desc">{description}</p>
            </div>
            <div className='book_delete'>
                <button className='book_btn' onClick={onDelete}><img src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"/></button>
            </div>
            </li>
        
    )
}

export default BooksItem;