import React, { Component } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';

class Ball extends Component {
	componentWillMount() {
		this.position = new Animated.ValueXY(0, 0);
		Animated.spring(this.position, { toValue: { x: 200, y: 400 } }).start();
	}

	render() {
		return (
			<Animated.View style={this.position.getLayout()}>
				<View style={styles.ball} />
			</Animated.View>
		);
	}
}

const styles = {
	ball: {
		width: 80,
		height: 80,
		borderColor: '#00acc1',
		borderWidth: 40,
		borderRadius: 40,
	}
};

export default Ball;
