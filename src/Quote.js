import React, {useState, useEffect} from "react";
import useFetch from "./useFetch";

export default function Quote() {
    const {get} = useFetch("https://stoicquotesapi.com/v1/api/quotes/random")

    const [quoteObj, setQuoteObj] = useState({})
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const [reset, setReset] = useState(1)

    useEffect( () => {
        get()
        .then(data => {console.log(response) 
        setQuoteObj(response)

        const {body, author, ...rest} = quoteObj;

        setQuote(body);
        setAuthor(author);
        })
        .catch(error => console.log(error))
    }, [reset])

    function handleButtonClick(){
        setReset(Math.random())
    }

    return <>
        <p id="text">{quote}</p>
        <p id="author">{author}</p>
        <button id="new-quote" onClick={()=>handleButtonClick}>New quote</button>
    </>
}
