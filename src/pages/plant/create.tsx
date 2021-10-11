import React from 'react';
import * as Recompose from 'recompose';
import { InfoParams } from '../../App';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import * as S from 'fp-ts/string';
import * as A from 'fp-ts/Array';
import * as F from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as IO from 'fp-ts/IO';
import * as E from 'fp-ts/Either';
import { withFormik, FormikProps, Form } from 'formik'
import * as Yup from 'yup';
import { Background, Body, MaxWidth, Column, Label, Submit, Input, TextArea, ErrorMessage } from '../../components';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { findById, Status, statuses } from '../../lib/plant';
import { getPlants, addPlant } from '../../api/local/plant';
import { 
    infoReducer, 
    defaultState, 
    LOADING,
    ERROR, 
    FETCHED, 
    State, 
    Action } from '../../state/info';
import { trace } from '../../lib/debug';
import { split } from 'fp-ts/lib/Choice';

// CONSTANTS
const defaultForm:Form = {
    name: '',
    description: '',
    status: 'Seed',
    careRequirement: '',
    sunRequirement: '',
    soilRequirement: '',
    tags: ''
};

const schema = Yup.object().shape({
    name: Yup.string().required().max(15, 'Name must be under 15 characters'),
    description: Yup.string(),
    status: Yup.string().required(),
    careRequirement: Yup.string(),
    sunRequirement: Yup.string(),
    soilRequirement: Yup.string(),
    tags: Yup.string()
})

const namePlaceHolder = 'Enter Name';
const descriptionPlaceholder = 'Enter Description';
const careRequirementPlaceholder = 'Enter Care Requirements';
const sunRequirementPlaceholder = 'Enter Sun Requirements';
const soilRequirementPlaceholder = 'Enter Soil Requirements';
const tagPlaceHolder = 'Enter Tags (separate tags by a comma)';

// INTERFACES
interface Props extends React.PropsWithChildren<unknown>, 
                        Recompose.reducerProps<State, Action, 'state', 'dispatch'>, 
                        RouteComponentProps<InfoParams>,
                        FormikProps<Form> {
};

type PostInjectProps = Omit<
    Props
    , 'state'
    | keyof FormikProps<Form>
    | 'dispatch'>;

interface Form {
    name: string;
    description: string;
    status: Status;
    careRequirement: string;
    sunRequirement: string;
    soilRequirement: string;
    tags: string;
}
// ALIASES

// LOCAL COMPONENTS

// DEFAULT PROPS

// COMPONENT
const Info = (props: Props) => (
    <Background centerHorizontal>
        <MaxWidth>
            <Header title={"New Plant"}/>
            <Body padded>
                <Form onSubmit={props.handleSubmit}>
                    <Column className={'pv2'}>
                        <Label for='name'>Name</Label>
                        <Input 
                            placeholder={namePlaceHolder} 
                            id='name' 
                            name='name'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            aria-required
                            aria-invalid={O.fold(
                                F.constFalse,
                                F.constTrue
                            )(O.fromNullable(props.errors.name && props.touched.name))}
                            required
                        />
                        { 
                            O.fold(
                                F.constNull,
                                F.constant(<ErrorMessage>{props.errors.name}</ErrorMessage>)
                            )(O.fromNullable(props.errors.name && props.touched.name))
                        }
                        <Label for='description'>Description</Label>
                        <TextArea 
                            placeholder={descriptionPlaceholder} 
                            id='description' 
                            name='description'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            aria-invalid={O.fold(
                                F.constFalse,
                                F.constTrue
                            )(O.fromNullable(props.errors.description && props.touched.description))}></TextArea>
                        { 
                            O.fold(
                                F.constNull,
                                F.constant(<ErrorMessage>{props.errors.description}</ErrorMessage>)
                            )(O.fromNullable(props.errors.description && props.touched.description))
                        }
                        <Label for='status'>Status</Label>
                        <select 
                            id='status' 
                            name='status'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            aria-invalid={O.fold(
                                F.constFalse,
                                F.constTrue
                            )(O.fromNullable(props.errors.status && props.touched.status))}>
                            <option value='Seed'>Seed</option>
                            <option value='Sprout'>Sprout</option>
                            <option value='Seedling'>Seedling</option>
                            <option value='Vegetative'>Vegetative</option>
                            <option value='Budding'>Budding</option>
                            <option value='Flowering'>Flowering</option>
                            <option value='Ripening'>Ripening</option>
                            <option value='Dead/Dormant/Harvested'>Dead/Dormant/Harvested</option>
                        </select>
                        <Label for='careRequirement'>Care Requirements</Label>
                        <TextArea 
                            placeholder={careRequirementPlaceholder} 
                            id='careRequirement' 
                            name='careRequirement'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            aria-invalid={O.fold(
                                F.constFalse,
                                F.constTrue
                            )(O.fromNullable(props.errors.careRequirement && props.touched.careRequirement))}></TextArea>
                        { 
                            O.fold(
                                F.constNull,
                                F.constant(<ErrorMessage>{props.errors.careRequirement}</ErrorMessage>)
                            )(O.fromNullable(props.errors.careRequirement && props.touched.careRequirement))
                        }
                        <Label for='sunRequirement'>Sun Requirements</Label>
                        <TextArea 
                            placeholder={sunRequirementPlaceholder} 
                            id='sunRequirement' 
                            name='sunRequirement'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            aria-invalid={O.fold(
                                F.constFalse,
                                F.constTrue
                            )(O.fromNullable(props.errors.sunRequirement && props.touched.sunRequirement))}></TextArea>
                        { 
                            O.fold(
                                F.constNull,
                                F.constant(<ErrorMessage>{props.errors.sunRequirement}</ErrorMessage>)
                            )(O.fromNullable(props.errors.sunRequirement && props.touched.sunRequirement))
                        }
                        <Label for='soilRequirement'>Soil Requirements</Label>
                        <TextArea 
                            placeholder={soilRequirementPlaceholder} 
                            id='soilRequirement' 
                            name='soilRequirement'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            aria-invalid={O.fold(
                                F.constFalse,
                                F.constTrue
                            )(O.fromNullable(props.errors.soilRequirement && props.touched.soilRequirement))}/>
                        { 
                            O.fold(
                                F.constNull,
                                F.constant(<ErrorMessage>{props.errors.soilRequirement}</ErrorMessage>)
                            )(O.fromNullable(props.errors.soilRequirement && props.touched.soilRequirement))
                        }
                        <Label for='tags'>Tags</Label>
                        <TextArea 
                            placeholder={tagPlaceHolder} 
                            id='tags' 
                            name='tags'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            aria-invalid={O.fold(
                                F.constFalse,
                                F.constTrue
                            )(O.fromNullable(props.errors.tags && props.touched.tags))}></TextArea>
                        { 
                            O.fold(
                                F.constNull,
                                F.constant(<ErrorMessage>{props.errors.tags}</ErrorMessage>)
                            )(O.fromNullable(props.errors.tags && props.touched.tags))
                        }
                    </Column>
                    <Submit value='Submit'/>
                </Form>
            </Body>
            <Footer/>
       </MaxWidth>
    </Background>
);

const withForm = withFormik<Props, Form>({
    mapPropsToValues: F.constant(defaultForm),
    validationSchema: schema,
    handleSubmit: (v, props) => {
        F.pipe(
            addPlant({ 
                ...v,
                status: F.pipe(
                    statuses,
                    A.findFirst<Status>((val) => S.Eq.equals(v.status, val)),
                    O.getOrElse(F.constant<Status>('Seed'))
                ),
                tags: A.map(F.flow(S.trim, S.toLowerCase))
                           (v.tags.split(','))
            }),
            IO.map(F.flow(
                E.getOrElseW(
                    (e) => 
                        props.props.dispatch(
                            { type: ERROR
                            , payload: 
                                { error: 'Failed to submit data' } }
                        )
                )
            ))
        )()
    }
})
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

export default withRouter(program(withForm(Info)));