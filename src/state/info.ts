import { DBPlant } from '../lib/plant'
import * as F from 'fp-ts/function';
import * as S from 'fp-ts/string';
import { Lens } from 'monocle-ts'
import { match, Matchable } from '../lib/matching';


export interface State {
    loading: boolean;
    info?: DBPlant;
    error?: string;
}

interface Reducers extends Matchable {
    'LOADING': Reducer<LoadingPayload>;
    'FETCHED': Reducer<InfoPayload>;
    'ERROR': Reducer<ErrorPayload>;
}

type Keys = 'LOADING' | 'FETCHED' | 'ERROR'

interface Type {
    type: Keys
}

interface LoadingPayload {

}

interface InfoPayload {
    info: DBPlant;
}

interface ErrorPayload {
    error: string;
}

type Payloads = 
    LoadingPayload |
    InfoPayload |
    ErrorPayload;

interface LoadingAction extends Type {
    payload: LoadingPayload
}

interface InfoAction extends Type {
    payload: InfoPayload;
};

interface ErrorAction extends Type {
    payload: ErrorPayload
}

export type Action = 
    LoadingAction | 
    InfoAction |
    ErrorAction;

interface Reducer <P>{
    (val: P): (state:State) => State;
}

export const LOADING:Keys = 'LOADING';
export const FETCHED:Keys = 'FETCHED';
export const ERROR:Keys = 'ERROR';

const loading = Lens.fromProp<State>()('loading');
const fetched = Lens.fromProp<State>()('info');
const error = Lens.fromProp<State>()('error');

export const defaultState: State = {
    loading: false,
    info: undefined,
    error: undefined
}

const reducers:Reducers = {
    [LOADING]: _ => F.flow(
        loading.modify(F.constTrue)
    ),
    [FETCHED]: payload => F.flow(
        loading.modify(F.constFalse),
        fetched.modify(F.constant(payload.info)),
        error.modify(F.constant(S.empty))
    ),
    [ERROR]: payload => F.flow(
        loading.modify(F.constFalse),
        error.modify(F.constant(payload.error)),
    )
}

interface reducer {
    (reducers:Reducers): ( state: State, action: Action) => State;
}
const reducer:reducer = (reducers) => ( state, action ) =>  
    match<Reducers, Reducer<Payloads>>(
        reducers, 
        F.constant(F.constant(state))
    )(action.type)(action.payload)(state);

export const infoReducer = reducer(reducers);


    