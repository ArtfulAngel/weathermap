import React, { Component } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Clear from '@material-ui/icons/Clear';

import './favorites.scss';
class Favorites extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        hadlerDeleteCityForFavorites: PropTypes.func,
        favorites: PropTypes.array,
    };

    hadlerDeleteCityForFavorites = e => {
        const { hadlerDeleteCityForFavorites } = this.props;
        hadlerDeleteCityForFavorites && hadlerDeleteCityForFavorites(e.target.id);
    };

    getTemp = value => {
        return Math.round(value - 273.15);
    };

    handlerForecastCity = e => {
        const { history } = this.props;
        history.push(`/forecast/${e.target.id}`);
    };

    renderItem = elem => {
        return (
            <ListItem className="favorites__item" key={elem.id} button>
                <Tooltip title="Просмотреть прогноз погоды">
                    <div id={elem.id} onClick={this.handlerForecastCity}>
                        <span id={elem.id}>{`${elem.name} ${this.getTemp(elem.main.temp)}°`}</span>
                    </div>
                </Tooltip>
                <Tooltip title="Удалить из избранного">
                    <ListItemIcon id={elem.id} className="favorites__clear" onClick={this.hadlerDeleteCityForFavorites}>
                        <Clear id={elem.id} onClick={this.hadlerDeleteCityForFavorites} />
                    </ListItemIcon>
                </Tooltip>
            </ListItem>
        );
    };

    render() {
        const { favorites } = this.props;
        return (
            <List component="nav" className="favorites">
                <div className="favorites__title">Избранное</div>
                {favorites
                    ? favorites.map(elem => {
                          return this.renderItem(elem);
                      })
                    : null}
            </List>
        );
    }
}

export default Favorites;
