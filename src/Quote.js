import React, {useState, useEffect} from "react";
import useFetch from "./useFetch";

export default function Quote() {
    const { get } = useFetch("https://stoicquotesapi.com/v1/api/quotes/")

    const [quote, setQuote] = useState(" ")
    const [quoteAuthor, setQuoteAuthor] = useState(" ")
    const [reset, setReset] = useState(1)
    const [tweetString, setTweetString] = useState()

    useEffect( () => {
        getQuote()

    }, [reset]);

    useEffect( () => {
        console.log("Author after author updates: "+quoteAuthor)
        console.log("Quote after author updates: "+quote)

        if (quote !== undefined) {
            
            const text = '"'+quote.replace(/ /g, "%20")+'"%20-'+quoteAuthor.replace(/ /g, "%20")
            setTweetString(text)
            console.log("tweetString: " + tweetString)
        }
    }, [quoteAuthor])

    function getQuote(){
        get("random")
        .then(data => {
            console.log(data) 
            const {body, author, ...rest} = data;

            setQuote(body);
            setQuoteAuthor(author);

            console.log("body: " + body)
            console.log("auth: "+ author)
        })
        .catch(error => console.log(error))
    }

    function handleTweetClick() {
        console.log("tweetString should be updated HERE: "+tweetString)
        window.open("https://twitter.com/intent/tweet?text="+{tweetString}+"&via=Nicole_Janeway", "_blank");
    }

    function handleResetClick(){
        setReset(Math.random())
    }

    return <>
        <p id="text">{quote}</p>
        <p id="author">{quoteAuthor}</p>
        <button id="tweet-quote" className="btn" onClick={handleTweetClick}>Tweet</button>
        <button id="new-quote" className="btn" onClick={handleResetClick}>New quote</button>
    </>
}
