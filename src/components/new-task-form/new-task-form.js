import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
    static propTypes = {
        value:      PropTypes.string.isRequired,
        addNewTask: PropTypes.func.isRequired,
        onChange:   PropTypes.func.isRequired,
    }

    onSubmit = e => {
        e.preventDefault(); 
        this.props.addNewTask(e.target.input.value);
    }

    onChange = e => this.props.onChange(e.target.value)

    render() {
        let { value } = this.props;
        let { onSubmit, onChange } = this;

        return (
            <form onSubmit={ onSubmit }>
                <input className="new-todo" name="input" 
                    value={ value } 
                    onChange={ onChange }
                    placeholder="What needs to be done?" autoFocus />
            </form>
        );
    }
}