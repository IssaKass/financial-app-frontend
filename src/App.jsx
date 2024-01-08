import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	const [number, setNumber] = useState(0);

	const handleClick = () => {
		fetch("/api", {
			method: "GET",
			redirect: "follow",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => setNumber(data.number))
			.catch((error) => console.error(error));
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<p>{import.meta.env.VITE_API_URL}</p>
							<button onClick={handleClick}>Fetch number</button>
							<p>{number}</p>
						</>
					}
				/>
				<Route
					path="/about"
					element={
						<>
							<p>About</p>
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
