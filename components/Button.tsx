interface ButtonProps {
onClick?: () => {};
  text: string;
}

export default function Button({
  onClick,
  text
}: ButtonProps) {
  return (
    <button onClick={onClick} className="bg-sky-500 py-3 text-lg font-semibold text-white rounded-full hover:bg-sky-600 transform transition-transform duration-300 active:scale-95">
        {text}
    </button>
  )};