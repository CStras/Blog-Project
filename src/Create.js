import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents page from refreshing once blog is submitted 
        const blog = { title, body, author }; // logging submitted blog

        setIsPending(true);

        fetch('http://localhost:8000/blogs', { // captures data from blog submit form and creates new object with submitted data in json data file
            method: 'POST',
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(blog)
        }).then (() => {
            console.log('new blog added');
            setIsPending(false);
            history.push('/'); //once blog is added, user is redirected to home page -  '/' check app.js 
        })


    }

    return ( 
        <div className="create">
            <h2>Add a New blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)} //tracking what is typed in title
                />
                <label>Blog body:</label>
                <textarea
                required
                value = {body}
                onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                value = {author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add Blog</button>}
                { isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;