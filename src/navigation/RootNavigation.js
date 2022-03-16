import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function navReset(name) {
  navigationRef.current?.resetRoot({index: 1, routes: [{name}]});
}
