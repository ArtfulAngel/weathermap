import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchCity from 'components/searchCity';
import CityItem from 'components/cityItem';
import Favorites from 'components/favorites';

import { setFavorites, deleteFavorites } from 'store/actions';
import { getListCity, getFavorites } from 'store/selectors';

import './main.scss';

class Main extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        listCity: PropTypes.array,
        favorites: PropTypes.array,
    };

    hadlerDeleteCityForFavorites = id => {
        const {
            actions: { onDeleteFavorites },
            favorites,
        } = this.props;
        const newFavorites = favorites.filter(el => {
            return el.id !== +id;
        });
        onDeleteFavorites(newFavorites);
    };

    hadlerAddFavorites = id => {
        const {
            actions: { onSetFavorites },
            favorites,
            listCity,
        } = this.props;
        const existsFavorite = favorites.some(el => {
            return el.id === +id;
        });
        if (!existsFavorite) {
            const newFavorites = listCity.filter(el => {
                return el.id === +id;
            });
            onSetFavorites(newFavorites);
        }
    };

    render() {
        const { listCity, favorites, history } = this.props;
        return (
            <div className="main">
                <aside className="main__favorites">
                    {favorites ? (
                        <Favorites
                            favorites={favorites}
                            history={history}
                            hadlerDeleteCityForFavorites={this.hadlerDeleteCityForFavorites}
                        />
                    ) : null}
                </aside>
                <div className="main__container">
                    <div className="main__search-block">
                        <SearchCity />
                    </div>
                    <div className="main__list">
                        {listCity
                            ? listCity.map((item, i) => {
                                  return (
                                      <CityItem
                                          key={i}
                                          weatherData={item}
                                          hadlerAddFavorites={this.hadlerAddFavorites}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listCity: getListCity(state),
        favorites: getFavorites(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            onSetFavorites: bindActionCreators(setFavorites, dispatch),
            onDeleteFavorites: bindActionCreators(deleteFavorites, dispatch),
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main);
