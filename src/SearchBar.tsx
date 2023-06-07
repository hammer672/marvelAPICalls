import monImageURL from './images/logo-marvel.svg';

function SearchBar() {
    return (
        <header>
            <a href="./" className="header-home">
                <img src={monImageURL} className="header-logo" />
            </a>
            <div className="header-wrapper">
                <div className="search-box">
                    <input type="text" className="search-input" placeholder="Search" />
                </div>
            </div>
        </header>
    )
}

export default SearchBar;