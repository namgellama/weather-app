import axios from 'axios';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function App() {
	const API_KEY = 'a4042cb5040cb68342db86a1995d773a';

	const [input, setInput] = useState('');
	const [weatherData, setWeatherData] = useState(null);
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

	const submitHandler = async (e) => {
		e.preventDefault();
		const res = await getCityData();
		const { lat, lon, name } = res[0];

		const data = await getWeatherData(lat, lon);
		setWeatherData(data);
		setCity(name);
	};

	return (
		<div className="my-20 w-[1000px] mx-auto flex justify-center flex-col items-center">
			<form
				className="border pl-5 pr-3 py-2 rounded-2xl bg-white flex items-center justify-between gap-x-3 w-[40%] mb-10"
				onSubmit={submitHandler}
			>
				<input
					type="text"
					className="outline-none"
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type="submit">
					<AiOutlineSearch className="text-lg" />
				</button>
			</form>

			<div>
				{/* {!weatherData && <h2>Loading...</h2>} */}

				{city && <h1 className="text-3xl font-bold">Weather in {city}</h1>}
				{weatherData && (
					<div className="my-5 text-lg">
						{weatherData?.weather.map((el) => (
							<div key={el.id}>
								<h1>Title: {el.main}</h1>
								<p>Description: {el.description}</p>
							</div>
						))}
						<h1>
							Wind Speed: {weatherData.wind.speed}, Wind Degree:{' '}
							{weatherData.wind.speed}
						</h1>
						<p>Temperature: {weatherData.main.temp}</p>
						<p className="text-lg ">
							Min Temperature: {weatherData.main.temp_min}
						</p>
						<p>Maximum Temperature: {weatherData.main.temp_max}</p>
						<p>Pressure: {weatherData.main.pressure}</p>
						<p>Humidity: {weatherData.main.humidity}</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
