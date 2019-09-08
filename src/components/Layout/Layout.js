import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

	state = {
		showSideDrawer: false
	}

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}

	render() {
		return(
			<Auxiliary>
				<Toolbar openDrawer={this.sideDrawerToggleHandler}/>
				<SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerToggleHandler} />
				<main className={classes.content}>
					{this.props.children}
				</main>
			</Auxiliary>
		)
	}
}

export default Layout;