function Input(props) {
    return (
        <input {...props} className={'bg-gray-300 text-black p-2 border border-reddit_ligh rounded-md block '+props.className} />
    );
}

export default Input;