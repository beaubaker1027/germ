import React from 'react';
import * as Recompose from 'recompose';
import { InfoParams } from '../../App';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import * as A from 'fp-ts/Array';
import * as F from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as IO from 'fp-ts/IO';
import * as E from 'fp-ts/Either';
import { Body } from '../../components/layout';
import { Background } from '../../components';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { findById } from '../../lib/plant';
import PlantInfo from '../../components/info';
import { getPlants } from '../../lib/plant';
import { 
    infoReducer, 
    defaultState, 
    LOADING,
    ERROR, 
    FETCHED, 
    State, 
    Action } from '../../state/info';
import { trace } from '../../lib/debug';

// CONSTANTS

// INTERFACES
interface Props extends React.PropsWithChildren<unknown>, 
                        Recompose.reducerProps<State, Action, 'state', 'dispatch'>, 
                        RouteComponentProps<InfoParams> {
};

type PostInjectProps = Omit<
    Props
    , 'state'
    | 'dispatch'>;
// ALIASES

// LOCAL COMPONENTS

// DEFAULT PROPS

// COMPONENT
const Info = (props: Props) => (
    <Background>
        <Header title={"Plant Info"}/>
        <Body>
            <PlantInfo plant={props.state?.info}/>
       </Body>
       <Footer/>
    </Background>
);

const program = Recompose.compose<Props, PostInjectProps>(
    Recompose.withReducer('state', 'dispatch', infoReducer, defaultState),
    Recompose.lifecycle<Props, unknown>({
        componentDidMount(){
            this.props.dispatch({type: LOADING, payload: {}});
            F.pipe(
                getPlants,
                IO.map(
                    E.fold(
                        F.flow(
                            e => trace(e as Error),
                            _ => this.props.dispatch({ type: ERROR, payload: {error: 'There was an issue fetching plants'}})
                        ),
                        F.flow(
                            findById(this.props.match.params.id),
                            O.fold(
                                () => this.props.dispatch({ type: ERROR, payload: { error: 'Couldn\'t find a plant with that id' }}),
                                plant => this.props.dispatch({ type: FETCHED, payload: { info: plant } } )
                            )
                        )
                    )
                )
            )();
        }
    })
);

export default withRouter(program(Info));