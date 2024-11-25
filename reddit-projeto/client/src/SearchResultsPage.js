
function SearchResultsPage(props) {

    const {text} = props.match.params;

    return(
        <div>
            {text}
        </div>
    )
}
export default SearchResultsPage;