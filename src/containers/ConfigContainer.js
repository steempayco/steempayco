import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = ({ config }) => ({
    color: config.color,
    number: config.number
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