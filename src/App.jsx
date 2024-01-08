import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	const [product, setProduct] = useState(null);

	const handleClick = () => {
		fetch("/api", {
			headers: { Accept: "application/json" },
		})
			.then((res) => res.json())
			.then((data) => setProduct(data))
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
							<button onClick={handleClick}>Fetch product</button>
							{product && (
								<ul>
									<li>{product.title}</li>
									<li>{product.description}</li>
									<li>{product.price}</li>
								</ul>
							)}
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
