import React from 'react';
import s from '../users/users.module.scss';

class NewPostForm extends React.Component {
    state = {
        title: '',
        description: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        const { title, description, id } = this.state
        e.preventDefault()
        this.props.onSubmit({
            title, description
        })
        this.setState({
            title: '',
            description: ''
        })
    }

    resetState = () => {
        this.setState({
        title: '',
        description: ''
    })}

    render() {
        const { title, description } = this.state
        const isFormValid = title.length > 0 && description.length > 0
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className={s.formWrapper}>
                <span className={s.inputItem}>new post</span>
                <input
                    className={s.inputItem}
                    placeholder='Title'
                    name='title'
                    value={title}
                    onChange={this.handleChange}
                />
                <textarea
                row={5}
                col={5}
                    className={s.inputItem}
                    placeholder='Description'
                    name='description'
                    value={description}
                    onChange={this.handleChange}
                />
                <div className={s.submitBtn}>
                    <button type='reset' onClick={this.resetState}>Reset</button>
                    <button type='submit' disabled={!isFormValid}>Submit</button>
                </div>
            </form>
        )
    }
}
export default NewPostForm