import React, { Component } from 'react';
import {
	View,
	Animated,
	PanResponder,
} from 'react-native';

class Deck extends Component {
	constructor(props) {
		super(props);
		
		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({ x: gesture.dx, y: gesture.dy });
			},
			onPenResponderRelease: () => {},
		});

		this.state = { panResponder, position };
	}
	renderCards() {
		return this.props.data.map(card => {
			return this.props.renderCard(card);
		});
	}

	render() {
		return (
			<Animated.View
				style={this.state.position.getLayout()}
				{...this.state.panResponder.panHandlers}
			>
				{this.renderCards()}
			</Animated.View>
		);
	}
}

export default Deck;
