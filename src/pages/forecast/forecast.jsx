import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { fetchCityDataByID } from 'store/actions';
import { getForecast } from 'store/selectors';

import './forecast.scss';

class Forecast extends Component {
    constructor(props) {
        super(props);
        const {
            actions: { onFetchCityDataByID },
            match,
        } = this.props;
        onFetchCityDataByID && onFetchCityDataByID(match.params.id);
    }

    render() {
        const { forecastFiveDays } = this.props;

        return forecastFiveDays && forecastFiveDays.city && forecastFiveDays.list ? (
            <div className="forecast" key={forecastFiveDays.city.id}>
                <div className="forecast__content">
                    <Card className="froecast__card" key={forecastFiveDays.city.id}>
                        <Typography className="froecast__title" color="textPrimary">
                            Погода в {forecastFiveDays.city.name} на 5 дней (с шагом каждые 3 часа)
                        </Typography>
                        {forecastFiveDays.list.map(el => {
                            const weather = el.weather[0];
                            const iconUrl = 'http://openweathermap.org/img/w/' + weather.icon + '.png';
                            return (
                                <Card className="froecast__card" key={forecastFiveDays.city.id}>
                                    <CardContent key={el.dt}>
                                        <Typography variant="headline" component="h2">
                                            {el.dt_txt} ожидается: {el.main.temp}°<img src={iconUrl} alt={el.description} />
                                        </Typography>

                                        <Typography component="p">Максимальная: {el.main.temp_max}°</Typography>
                                        <Typography component="p">Минимальная: {el.main.temp_min}°</Typography>
                                        <Typography component="p">Скорость ветра: {el.wind.speed} миль/час</Typography>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Card>
                </div>
            </div>
        ) : null;
    }
}

const mapStateToProps = state => {
    return {
        forecastFiveDays: getForecast(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            onFetchCityDataByID: bindActionCreators(fetchCityDataByID, dispatch),
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Forecast);
