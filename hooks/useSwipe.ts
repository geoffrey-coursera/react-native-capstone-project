import { useRef } from 'react';
import { PanResponder, PanResponderGestureState } from 'react-native';

type Callbacks = {
    shouldIntercept: (gestureState: PanResponderGestureState) => boolean
    up: () => void,
};

export const useSwipe = ({ up, shouldIntercept }: Callbacks, distance=50) => {
    const swipeUpHandlers = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, state) => shouldIntercept(state),
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy < -1 * distance) up();
            }
        })
    ).current.panHandlers;

    return swipeUpHandlers;
};