import { useRef } from 'react';
import { PanResponder } from 'react-native';

type Callbacks = { up: () => void, down: () => void };

export const useSwipe = ({ up, down }: Callbacks, distance=50) => {
    const swipeUpHandlers = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dx) < Math.abs(gestureState.dy),
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy < -1 * distance) {
                    up();
                } else if (gestureState.dy > 1 * distance) {
                    down();
                }
            }
        })
    ).current.panHandlers;

    return swipeUpHandlers;
};