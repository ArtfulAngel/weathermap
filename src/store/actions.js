import axios from 'axios';

export const GET_CITY = 'GET_CITY';
export const GET_CURRENT_CITY = 'GET_CURRENT_CITY';
export const SET_FAVORITES = 'SET_FAVORITES';
export const DELETE_FAVORITES = 'DELETE_FAVORITES';

export function fetchCityData(searchLine) {
    return dispatch => {
        return axios({
            url: `https://openweathermap.org/data/2.5/find?&mode=json&appid=b6907d289e10d714a6e88b30761fae22&q=${searchLine}`,
            method: 'get',
            responseType: 'json',
        })
            .then(response => {
                const { list } = response.data;
                dispatch(fetchCityDataSuccess(list));
            })

            .catch(error => {
                return error;
            });
    };
}

function fetchCityDataSuccess(data) {
    return {
        type: GET_CITY,
        payload: data,
    };
}

export function fetchCityDataByID(id) {
    return dispatch => {
        return axios({
            url: `https://openweathermap.org/data/2.5/forecast?&mode=json&appid=b6907d289e10d714a6e88b30761fae22&id=${id}`,
            method: 'get',
            responseType: 'json',
        })
            .then(response => {
                const { data } = response;
                dispatch(fetchCityDataByIDSuccess(data));
            })

            .catch(error => {
                return error;
            });
    };
}

function fetchCityDataByIDSuccess(data) {
    return {
        type: GET_CURRENT_CITY,
        payload: data,
    };
}

export function setFavorites(data) {
    return {
        type: SET_FAVORITES,
        payload: data,
    };
}
export function deleteFavorites(data) {
    return {
        type: DELETE_FAVORITES,
        payload: data,
    };
}
