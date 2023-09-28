export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

export const fetchWeatherRequest = (city) => ({
	type: FETCH_WEATHER_REQUEST,
	payload: city,
});

export const fetchWeatherSuccess = (weatherData) => ({
	type: FETCH_WEATHER_SUCCESS,
	payload: weatherData,
});

export const fetchWeatherFailure = (error) => ({
	type: FETCH_WEATHER_FAILURE,
	payload: error,
});
