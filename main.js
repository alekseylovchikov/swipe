import Expo from 'expo';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-elements'

import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Girl #1', uri: 'https://images.pexels.com/photos/160699/girl-dandelion-yellow-flowers-160699.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
  { id: 2, text: 'Girl #2', uri: 'https://images.pexels.com/photos/301326/pexels-photo-301326.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
  { id: 3, text: 'Girl #3', uri: 'https://images.pexels.com/photos/221212/pexels-photo-221212.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
  { id: 4, text: 'Girl #4', uri: 'https://images.pexels.com/photos/237637/pexels-photo-237637.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
  { id: 5, text: 'Girl #5', uri: 'https://images.pexels.com/photos/206276/pexels-photo-206276.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
  { id: 6, text: 'Girl #6', uri: 'https://images.pexels.com/photos/234883/pexels-photo-234883.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
  { id: 7, text: 'Girl #7', uri: 'https://images.pexels.com/photos/179734/pexels-photo-179734.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
];

class App extends React.Component {
  renderCard(card) {
    return (
      <Card
        key={card.id}
        title={card.text}
        image={{ uri: card.uri }}>
        <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#03A9F4'
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='VIEW NOW' />
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="All Done!">
        <Text style={{ marginBottom: 10 }}>There's no more content here!</Text>
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          onSwipeRight={item => console.log(item)}
          onSwipeLeft={item => console.log(item)}
          renderNoMoreCards={() => this.renderNoMoreCards()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  }
});

Expo.registerRootComponent(App);
