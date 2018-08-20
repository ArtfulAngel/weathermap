import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class CityItem extends Component {
    static propTypes = {
        hadlerAddFavorites: PropTypes.func,
        weatherData: PropTypes.any,
    };

    hadlerAddFavorites = e => {
        const { hadlerAddFavorites } = this.props;
        hadlerAddFavorites && hadlerAddFavorites(e.currentTarget.id);
    };

    getTemp = value => {
        return Math.round(value - 273.15);
    };

    render() {
        const { weatherData } = this.props;
        const weather = weatherData.weather[0];
        const iconUrl = 'http://openweathermap.org/img/w/' + weather.icon + '.png';
        return (
            <Fragment key={weatherData.id}>
                <h1>
                    Погода в {weatherData.name}
                    <img src={iconUrl} alt={weatherData.description} />
                </h1>
                <p>Сейчас: {this.getTemp(weatherData.main.temp)}°</p>
                <p>Максимальная: {this.getTemp(weatherData.main.temp_max)}°</p>
                <p>Минимальная: {this.getTemp(weatherData.main.temp_min)}°</p>
                <p>Скорость ветра: {weatherData.wind.speed} миль/час</p>
                <Button
                    id={weatherData.id}
                    variant="extendedFab"
                    color="primary"
                    aria-label="Add"
                    onClick={this.hadlerAddFavorites}
                >
                    <AddIcon /> В избранное
                </Button>
            </Fragment>
        );
    }
}
export default CityItem;
