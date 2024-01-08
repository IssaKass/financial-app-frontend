import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	const [number, setNumber] = useState(0);

	const handleClick = () => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setNumber(data.number))
			.catch((error) => {
				console.error("Error:", error);
				if (error.response) {
					// The request was made and the server responded with a non-2xx status code
					console.error("Response data:", error.response.data);
					console.error("Response status:", error.response.status);
					console.error("Response headers:", error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					console.error("Request data:", error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.error("Error message:", error.message);
				}
			});
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
