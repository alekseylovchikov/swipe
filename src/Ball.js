import React, { Component } from 'react';
import { View } from 'react-native';

class Ball extends Component {
	render() {
		return <View style={styles.ball} />;
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
