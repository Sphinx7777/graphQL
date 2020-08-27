import React from 'react';
import { NavLink } from "react-router-dom";
import s from './header.module.scss'


let link = (to, title) => {
	return (
		<NavLink className={s.item}
			activeClassName=''
			to={`${to}`}>
			{title}
		</NavLink>
	)
};

export const Header = (props) => {

	return (
		<div className={s.headerWrapper}>
			<NavLink className={s.item}
				activeClassName=''
				exact to='/'>
				Main
					</NavLink>
			{link('/users', 'Users')}
			{link('/posts', 'Posts')}
			{link('/register', 'Register')}
		</div>
	)
};