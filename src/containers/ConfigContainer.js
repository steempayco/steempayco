import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    color: state.color,
    number: state.number
});

const mapDispatchToProps = (dispatch) => ({
    onUpdateConfig: () => dispatch(actions.increment()),
    onLoadConfig: () => dispatch(actions.decrement()),
    onSetColor: () => {
        const color = 'black'; // 임시
        dispatch(actions.setColor(color));
    }
});

const ConfigContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);