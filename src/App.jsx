import "./App.css";
import { useState } from "react";

function App() {
	const [number, setNumber] = useState(0);

	const handleClick = () => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setNumber(data.number))
			.catch((error) => console.error(error));
	};

	return (
		<>
			<p>{import.meta.env.VITE_API_URL}</p>
			<button onClick={handleClick}>Fetch number</button>
			<p>{number}</p>
		</>
	);
}

export default App;
