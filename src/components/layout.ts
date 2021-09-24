import styled from 'styled-components';
import * as S from 'fp-ts/string';
import * as B from 'fp-ts/boolean';
import * as F from 'fp-ts/function';
import * as SG from 'fp-ts/Semigroup';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';

interface ExtendedProps {
    centerVertical?: boolean;
    centerHorizontal?: boolean;
}

interface extendProp {
    (value: string): (prop?: boolean) => (className: string) => string;
}

const extendBooleanProp:extendProp = value => prop => className => B.fold(
        F.constant(className),
        F.constant(A.reduce(className, S.Semigroup.concat)([' ', value]))
    )(F.pipe(
        O.fromNullable(prop),
        O.getOrElse(
            F.constFalse
        )
    ));


export const Column = styled.div.attrs<ExtendedProps>(props => ({
    className: F.pipe(
        extendBooleanProp('justify-center')(props.centerVertical)('flex flex-column ph2'),
        extendBooleanProp('items-center')(props.centerHorizontal)
    )
}))<ExtendedProps>``;

export const Row = styled.div.attrs<ExtendedProps>(props => ({
    className: F.pipe(
        extendBooleanProp('justify-center')(props.centerHorizontal)('flex flex-row'),
        extendBooleanProp('items-center')(props.centerVertical)
    )
}))<ExtendedProps>``;

export const Body = styled.div.attrs({
    className: 'flex flex-column flex-auto'
})``;