function notNull(data) {
    return data ? data : null;
}

export function getListCity(state) {
    return notNull(state.listCity);
}
export function getFavorites(state) {
    return notNull(state.favorites);
}
export function getForecast(state) {
    return notNull(state.forecastFiveDays);
}
