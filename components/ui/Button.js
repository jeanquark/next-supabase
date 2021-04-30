import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './Button.module.css'


const ToucanUIButton = (props) => {
	const successColor = '#12824C'
	const errorColor = '#12824C'
	const infoColor = '#12824C'
	const disabledColor = '#12824C'
	return (
		<Button size={props.size} style={{ backgroundColor: successColor, color: '#FFFFFF' }} onClick={props.handleClick}>
			{props.text}
		</Button>

		/* <button type="button" className={styles.error}>
		<button type="button" className={"success"}>
			Destroy
		</button> */
	)
}

export default ToucanUIButton;