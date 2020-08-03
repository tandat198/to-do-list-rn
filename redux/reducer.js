import * as actionTypes from "./actionTypes";

const INITIAL_STATE = {
    tasks: [],
    isLoading: false,
    isCreating: false,
    errors: {},
    isSuccess: false,
    isUpdating: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_TODOS_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasks: action.payload,
            };
        case actionTypes.GET_TODOS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: { getDataFail: true },
            };
        case actionTypes.CREATE_TODO_START:
            return {
                ...state,
                isCreating: true,
                isSuccess: false,
                errors: {},
            };
        case actionTypes.CREATE_TODO_SUCCESS:
            return {
                ...state,
                isCreating: false,
                isSuccess: true,
                tasks: state.tasks.concat([action.payload]),
                errors: {},
            };
        case actionTypes.CREATE_TODO_FAILURE:
            return {
                ...state,
                isCreating: false,
                errors: action.payload,
            };
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
            };
        case actionTypes.UPDATE_TODO_START:
            return {
                ...state,
                isUpdating: true,
            };
        case actionTypes.UPDATE_TODO_SUCCESS:
            const tasks = state.tasks;
            const { data, index } = action.payload;

            tasks[index] = {
                ...tasks[index],
                isDone: data.isDone,
            };

            return {
                ...state,
                tasks: tasks.concat([]),
                isUpdating: false,
            };
        default:
            return state;
    }
}
