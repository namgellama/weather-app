import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
	FETCH_WEATHER_REQUEST,
	fetchWeatherSuccess,
	fetchWeatherFailure,
} from '../actions/weatherActions';

const API_KEY = import.meta.env.VITE_API_KEY;

function* getCityData(action) {
	try {
		const { data } = yield call(
			axios.get,
			`http://api.openweathermap.org/geo/1.0/direct?q=${action.payload}&appid=${API_KEY}`
		);
		const { lat, lon, name } = data[0];
		const weatherData = yield call(getWeatherData, lat, lon);
		yield put(fetchWeatherSuccess(weatherData));
	} catch (error) {
		yield put(fetchWeatherFailure(error));
	}
}

function* getWeatherData(lat, lon) {
	try {
		const { data } = yield call(
			axios.get,
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
		);
		return data;
	} catch (error) {
		yield put(fetchWeatherFailure(error));
	}
}

export function* watchFetchWeather() {
	yield takeLatest(FETCH_WEATHER_REQUEST, getCityData);
}
