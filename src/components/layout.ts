import styled from 'styled-components';
import * as S from 'fp-ts/string';
import * as B from 'fp-ts/boolean';
import * as F from 'fp-ts/function';
import * as SG from 'fp-ts/Semigroup';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';

interface LayoutProps {
    flex?: boolean
    centerVertical?: boolean;
    centerHorizontal?: boolean;
    padded?: boolean;
}

interface SpacingProps {
    padded?: boolean;
}

interface extendProp <P> {
    (value: string): (prop?: P) => (className: string) => string;
}

// const extendNumberProp: extendProp<number> = value => prop => className =>


const extendBooleanProp:extendProp<boolean> = value => prop => className => 
    B.fold(
        F.constant(className),
        F.constant(A.reduce(className, S.Semigroup.concat)([' ', value]))
    )(F.pipe(
        O.fromNullable(prop),
        O.getOrElse(
            F.constFalse
        )
    ));

interface concatClass {
    (value?: string): (className: string) => string;
}
const concatClass:concatClass = value => className => F.pipe(
    O.fromNullable(value),
    O.getOrElse(
        F.constant(S.empty)
    ),
    (val) => S.Semigroup.concat(className, val)
)

const Box = styled.div.attrs<LayoutProps & SpacingProps>(props => ({
    className: F.pipe(
        extendBooleanProp('justify-center')(props.centerVertical)(''),
        extendBooleanProp('items-center')(props.centerHorizontal),
        extendBooleanProp('ph2')(props.padded)
    )
}))<LayoutProps & SpacingProps>``;

export const Column = styled(Box).attrs<LayoutProps & SpacingProps>(props => ({
    className: concatClass(props.className)('flex flex-column')
}))<LayoutProps & SpacingProps>``;

export const Row = styled(Box).attrs<LayoutProps & SpacingProps>(props => ({
    className: concatClass(props.className)('flex flex-row')
}))<LayoutProps & SpacingProps>``;

export const Background = styled(Box).attrs<LayoutProps & SpacingProps>(props => ({
    className: concatClass(props.className)('flex flex-column w-100 h-100 ph2-ns')
}))<LayoutProps & SpacingProps>`
    background-color: ${props => props.theme.colors.background};
`;

export const Body = styled.div.attrs({
    className: 'flex flex-column flex-auto'
})``;

export const MaxWidth = styled(Background)`
    max-width: ${props => props.theme.width}px;
`;