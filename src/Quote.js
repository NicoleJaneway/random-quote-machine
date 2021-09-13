import React, {useState, useEffect} from "react";
import useFetch from "./useFetch";

export default function Quote() {
    const { get, loading } = useFetch("https://stoicquotesapi.com/v1/api/quotes/")

    const [quoteObj, setQuoteObj] = useState({})
    const [quote, setQuote] = useState()
    const [quoteAuthor, setQuoteAuthor] = useState()
    const [reset, setReset] = useState(1)

    useEffect( () => {
        getQuote()
    }, []); //this is not working - not sure why.

    useEffect( () => {
        getQuote()
    }, [reset]);

    function getQuote(){
        get("random")
        .then(data => {
            console.log(data) 
            setQuoteObj(data)

            const {body, author, ...rest} = quoteObj;

            setQuote(body);
            setQuoteAuthor(author);
        })
        .catch(error => console.log(error))
    }

    function handleResetClick(){
        setReset(Math.random())
    }

    function handleTweetClick() {
        window.open("https://twitter.com/intent/tweet", "_blank");
    }

    return <>
        <p id="text">{quote}</p>
        <p id="author">{quoteAuthor}</p>
        <button id="tweet-quote" className="btn" onClick={handleTweetClick}>Tweet</button>
        <button id="new-quote" className="btn" onClick={handleResetClick}>New quote</button>
    </>
}
