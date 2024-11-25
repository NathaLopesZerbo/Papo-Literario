function Button({ className = '', outline, ...props }) {
  let classNames = 'border  rounded-full px-3 py-1 font-bold';
  if (!outline) {
    classNames += ' bg-button_color text-reddit_light border-white';
  } else {
    classNames += ' text-gray-800 border-gray-900';
  }

  return (
    <button className={`${classNames} ${className}`} {...props} />
  );
}

export default Button;
