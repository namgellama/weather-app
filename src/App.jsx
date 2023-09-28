import axios from 'axios';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchWeatherRequest,
	fetchWeatherSuccess,
	fetchWeatherFailure,
} from './redux/actions/weatherActions';

function App() {
	const dispatch = useDispatch();
	const weatherData = useSelector((state) => state.weatherData);
	const city = useSelector((state) => state.city);
	const loading = useSelector((state) => state.loading);
	const error = useSelector((state) => state.error);

	const [input, setInput] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(fetchWeatherRequest(input));
	};

	return (
		<div className="w-[1000px] mx-auto flex justify-center flex-col items-center  py-5">
			<form
				className="border border-gray-400 pl-5 pr-3 py-2 rounded-2xl bg-white flex items-center justify-between gap-x-3 w-[40%] mb-10"
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

				{loading && (
					<span className="loading loading-spinner loading-md"></span>
				)}
				{error && <h1>{error}</h1>}

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
