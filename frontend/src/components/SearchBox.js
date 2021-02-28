import React, { useState } from 'react';

const SearchBox = (props) => {
    const [name, setName] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);
    }
    return (
        <div >
            <form onSubmit={submitHandler}>
                <div class="search-box">
                    <input className="search-txt" type="text" name="q" id="q" onChange={(e) => setName(e.target.value)} />
                    <button type="submit" className="search-btn"><i className="fa fa-search"></i></button>
                    </div>
            </form>
        </div>
    );
};

export default SearchBox;