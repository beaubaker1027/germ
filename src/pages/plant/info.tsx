import React from 'react';
import * as Recompose from 'recompose';
import { InfoParams } from '../../App';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import * as AP from 'fp-ts/Apply';
import * as A from 'fp-ts/Array';
import * as F from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as I from 'fp-ts/Identity';
import * as IO from 'fp-ts/IO';
import * as E from 'fp-ts/Either';
import * as S from 'fp-ts/string';
import * as R from 'fp-ts/Record';
import * as RF from 'fp-ts/Refinement';
import { Background, Body, MaxWidth, Column, Link, Row, Hash } from '../../components';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { findById, Plants } from '../../lib/plant';
import { getPlants } from '../../api/plant';
import { getJournals } from '../../api/journal';
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
// Local Components
const ListItemBox = styled.div.attrs({
    className: 'pv1'
})``;

// DEFAULT PROPS

// COMPONENT
const Info = (props: Props) => (
    <Background centerHorizontal>
        <MaxWidth>
            <Header title={"Plant Info"}/>
            <Body>
                <ListItemBox>
                    <Column>
                    <Link to={`/plants/${props.state.info?.id}`}>{props.state.info?.name}</Link>
                    <Row>
                        {
                            A.map<string, JSX.Element>(
                                (tag) => <Hash to={`/tags/${tag}`}>#{tag}</Hash>
                            )(props.state.info?.tags ?? [])
                        }
                    </Row>
                    </Column>
                </ListItemBox>
            </Body>
            <Footer/>
       </MaxWidth>
    </Background>
);

const program = Recompose.compose<Props, PostInjectProps>(
    Recompose.withReducer('state', 'dispatch', infoReducer, defaultState),
    Recompose.lifecycle<Props, unknown>({
        componentDidMount(){
            this.props.dispatch({type: LOADING, payload: {}});
            F.pipe(
                IO.Do,
                IO.apS('plants', getPlants),
                IO.apS('journals', getJournals),
                IO.map(AP.sequenceS(E.Apply)),
                IO.map(
                    F.flow(
                        E.fold(
                            F.flow(
                                e => trace(e as Error),
                                _ => this.props.dispatch({ type: ERROR, payload: {error: 'There was an issue fetching plants'}})
                            ),
                            F.flow(
                                I.bind('plant', ({plants}) => findById(this.props.match.params.id)(plants)),
                                I.bind('fjournals', ({journals}) => findById(this.props.match.params.id)(journals)),
                                ({plant, fjournals}) => AP.sequenceS(O.Apply)({plant, journals:fjournals}),
                                O.fold(
                                    () => this.props.dispatch({ type: ERROR, payload: { error: 'Couldn\'t find a plant with that id' }}),
                                    F.flow(
                                        I.chainFirst(({plant}) => F.constant(this.props.dispatch({ type: FETCHED, payload: { info: plant } } ))),
                                        I.chain(({journals}) => this.props.dispatch({ type: FETCHED, payload: { info: journals } } ))
                                    )
                                )
                            )
                        )
                    )
                )
            )();
        }
    })
);

export default withRouter(program(Info));