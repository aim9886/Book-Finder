import React, { useState, useEffect } from "react";
import Card from "./Card"
import axios from "axios";
const Main = () => {
    const [search, setSearch] = useState("");
    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=React Js&key=AIzaSyDh4MxVZ0u-yRyTTT_LYtrJUFAGvwOHmEI&maxResults=40').then(res => setBookData(res.data.items),
            setIsLoading(false))
            .catch(err => console.log(err))

    }, []);
    const searchBook = async (evt) => {
        if (evt.key === "Enter") {
            axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyDh4MxVZ0u-yRyTTT_LYtrJUFAGvwOHmEI&maxResults=40').then(res => setBookData(res.data.items), setIsLoading(false))
                .catch(err => console.log(err))

        }
    }
    return (
        <>
            <div className="header">
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <div className="search">
                        <input type="text" placeholder="Enter Your Book Name..." value={search} onChange={e => setSearch(e.target.value)} onKeyPress={searchBook} />
                    </div>
                </div>
            </div>
            {isLoading ? (
                //spinner
                < div className="spinner">
                    <div className="loader" />
                </div>
            ) : (
                <div className="container">
                    <Card book={bookData} />
                </div>
            )
            }
        </>
    )
}
export default Main;