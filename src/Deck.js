import React, { Component } from 'react';
import {
	View,
	Animated,
	PanResponder,
	Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
	static defaultProps = {
		onSwipeLeft: () => {},
		onSwipeRight: () => {},
	};

	constructor(props) {
		super(props);
		
		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({ x: gesture.dx, y: gesture.dy });
			},
			onPanResponderRelease: (event, gesture) => {
				if (gesture.dx > SWIPE_THRESHOLD) {
					this.forceSwipe('right');
				} else if (gesture.dx < -SWIPE_THRESHOLD) {
					this.forceSwipe('left');
				} else {
					this.resetPosition();
				}
			},
		});

		this.state = { panResponder, position, index: 0 };
	}

	forceSwipe(direction) {
		const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
		Animated.timing(this.state.position, {
			toValue: { x, y: 0 },
			duration: SWIPE_OUT_DURATION
		}).start(() => this.onSwipeComplete(direction));
		// передаем direction в onSwipeComplete
	}

	onSwipeComplete(direction) {
		const { onSwipeLeft, onSwipeRight, data } = this.props;
		const item = data[this.state.index];

		direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
		this.state.position.setValue({ x: 0, y: 0 });
		this.setState({ index: this.state.index + 1 });
	}

	resetPosition() {
		Animated.spring(this.state.position, {
			toValue: { x: 0, y: 0 }
		}).start();
	}

	getCardStyle() {
		const { position } = this.state;
		const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
			outputRange: ['-120deg', '0deg', '120deg']
		});
		return {
			...position.getLayout(),
			transform: [{ rotate }]
		};
	}

	renderCards() {
		const { index: currentIndex } = this.state;
		return this.props.data.map((card, index) => {
			if (index < currentIndex) return null;
			if (index === currentIndex) {
				return (
					<Animated.View
						key={index}
						style={this.getCardStyle()}
						{...this.state.panResponder.panHandlers}
					>
						{this.props.renderCard(card)}
					</Animated.View>
				);
			}
			return this.props.renderCard(card);
		});
	}

	render() {
		return (
			<View>
				{this.renderCards()}
			</View>
		);
	}
}

export default Deck;
