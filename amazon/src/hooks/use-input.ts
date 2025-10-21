import { Action } from "../shared/models/action.interface";
import { INPUT_ACTION_BLUR, INPUT_ACTION_CHANGE, INPUT_ACTION_CLEAR, InputActionType } from "./models/InputAction";
import { InputState } from "./models/InputState.Interface";
import { ChangeEvent, useReducer } from "react";
import { ValidatorFunction } from "../shared/utils/validation/models/ValidatorFn";

const initialInputState: InputState = {
    text: '',
    hasBeenTouched: false
}

const inputReduser = (state: InputState, action: Action<InputActionType>) => {
    const { type, value = ''} = action;

    switch (type) {
        case INPUT_ACTION_CHANGE:
            return { text: value, hasBeenTouched: state.hasBeenTouched}
        case INPUT_ACTION_BLUR:
            return { text: state.text, hasBeenTouched: true}
        case INPUT_ACTION_CLEAR:
            return { text: '', hasBeenTouched: false}
        default:
            return { ...state };
    }
};

const useInput = (validatorFunction?: ValidatorFunction) => {
    const [{ text, hasBeenTouched }, dispatch] = useReducer(inputReduser, initialInputState);

    const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: INPUT_ACTION_CHANGE, value: e.target.value });
    };

    let shouldReturnError;

    if (validatorFunction) {
        const isValid = validatorFunction(text);
        shouldReturnError = !isValid && hasBeenTouched;
    }
    
    const inputBlurHandler = () => {
        dispatch({ type: INPUT_ACTION_BLUR });
    };

    const clearHandler = () => {
        dispatch({ type: INPUT_ACTION_CLEAR });
    };

    return {
        text,
        shouldReturnError,
        textChangeHandler,
        inputBlurHandler,
        clearHandler
    };
}

export default useInput;