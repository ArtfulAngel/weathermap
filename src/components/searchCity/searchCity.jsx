import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { fetchCityData } from 'store/actions';

class SearchCity extends Component {
    state = { searchText: '' };

    handlerChangeInput = e => {
        this.setState({ searchText: e.target.value });
    };

    handlerGetListCity = () => {
        const {
            actions: { onFetchCityData },
        } = this.props;
        const { searchText } = this.state;
        onFetchCityData(searchText);
    };

    render() {
        return (
            <Fragment>
                <TextField
                    id="search"
                    label="Введите город"
                    type="search"
                    margin="normal"
                    value={this.state.searchText}
                    onChange={this.handlerChangeInput}
                />
                <Button variant="contained" color="primary" onClick={this.handlerGetListCity}>
                    Найти
                </Button>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            onFetchCityData: bindActionCreators(fetchCityData, dispatch),
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(SearchCity);
