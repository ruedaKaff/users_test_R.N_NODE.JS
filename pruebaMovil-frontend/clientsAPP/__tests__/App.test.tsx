/**
 * @format
 */
console.log("App.test is runing");
import 'react-native';
import React from 'react';
import App from '../App';
console.log("App.test is runing");

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
