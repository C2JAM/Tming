import React, { useReducer, useContext } from "react";
import { v4 as uuid } from "uuid"; 

export const VOTETEMPLATE = 'votetemplate';

export const ADD = 'add';
export const DELETE = 'delete';

export const TemplateContext = React.createContext();

const TemplateInitailState = () => {
    const template = window.localStorage.getItem(VOTETEMPLATE);
    if(template) {
        return JSON.parse(template);
    } else {
        return [];
    }
}

const reducer = (state, action) => {
    switch(action.type) {
        case ADD:
            return [...state, { data: action.payload.data, id: uuid()} ];
        case DELETE:
            return state.filter(value => value.id !== action.id);
        default:
            return new Error();
    }
}

const TemplateProvider = ({ children }) => {
    const [template, dispatch] = useReducer(reducer, TemplateInitailState());
    return (
        <TemplateContext.Provider value={{ template, dispatch }}>
            { children }
        </TemplateContext.Provider>
    );
};

export default TemplateProvider;