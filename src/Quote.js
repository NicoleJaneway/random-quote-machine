import React from "react";
import useFetch from "./useFetch";

export default function Quote() {
    return <>
        <p id="text">{quoteText}</p>
        <p id="author">{quoteAuthor}</p>
    </>
}
