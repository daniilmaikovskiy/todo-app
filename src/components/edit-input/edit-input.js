import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './edit-input.css';

export default class EditInput extends Component {
    static propTypes = {
        className:   PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        onEdited:    PropTypes.func.isRequired,
        isCompleted: PropTypes.bool.isRequired,
    }

    onSubmit = e => {
        e.preventDefault(); 
        this.props.onEdited(e.target.input.value);
    }

    onChange = e => e.target.value = e.target.value.trimLeft();

    render() {
        let { className, isCompleted, description } = this.props;
        let { onSubmit, onChange } = this;

        if (className.indexOf('editing') + 1) {
            let secondClass = 'edit-' + (isCompleted ? 'completed' : 'active');
            let editClassName = 'edit ' + secondClass;
      
            return (
                <form onSubmit={ onSubmit }>
                    <input type="text" 
                        className={ editClassName } 
                        onChange={ onChange }
                        defaultValue={ description } 
                        name='input' />
                </form>
            );
        }
      
        return null;
    }
}