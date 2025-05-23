import { call, put, takeLatest, select } from 'redux-saga/effects';
import { fetchWeatherSuccess, fetchWeatherStart, fetchWeatherFailure } from './weatherSlice';
import { RootState } from '@/store/store';

function* getWeather(action: ReturnType<typeof fetchWeatherStart>) {
    try {
          
        const token = yield select((state: RootState) => state.auth.token);
        const response: Response = yield call(fetch, '/api/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(action.payload),
        });

        if (response.status === 200) {
            const data = yield response.json();
            console.log('weather data', data)
            yield put(fetchWeatherSuccess(data));
            console.log('Message retrieved');
        } else if (response.status === 401) {
            console.log('Retrieval failed: Unauthorized');
            yield put(fetchWeatherFailure('Invalid token'));
        } else {
            console.log('Retrieval failed: Unexpected error');
            yield put(fetchWeatherFailure('Unexpected error occurred'));
        }
    } catch (error) {
        console.log('Retrieval failed: Network error', error);
        yield put(fetchWeatherFailure('Network error occurred'));
    }
}

export function* watchWeatherSaga() {
    yield takeLatest(fetchWeatherStart.type, getWeather);
}