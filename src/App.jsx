import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
	const API_KEY = 'a4042cb5040cb68342db86a1995d773a';

	const [input, setInput] = useState('');
	const [weatherData, setWeatherData] = useState([]);
	const [city, setCity] = useState('');

	const getCityData = async () => {
		try {
			const { data } = await axios.get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${API_KEY}`
			);
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const getWeatherData = async (lat, lon) => {
		try {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
			);
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const submitHandler = async () => {
		const res = await getCityData();
		const { lat, lon, name } = res[0];

		const { weather } = await getWeatherData(lat, lon);
		setWeatherData(weather);
		setCity(name);
	};

	return (
		<>
			<input type="text" onChange={(e) => setInput(e.target.value)} />
			<button onClick={submitHandler}>Submit</button>

			{weatherData.length ? (
				<div>
					<h1>Weather in {city}</h1>

					{weatherData &&
						weatherData.map((el) => (
							<div key={el.id}>
								<h1>{el.main}</h1>
								<p>{el.description}</p>
							</div>
						))}
				</div>
			) : null}
		</>
	);
}

export default App;
