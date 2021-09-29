import * as S from 'fp-ts/string';
import * as C from 'fp-ts/Console';
import * as O from 'fp-ts/Option';
import * as IO from 'fp-ts/IO';
import * as B from 'fp-ts/boolean';
import * as F from 'fp-ts/function';

type Debug = boolean;
type Msg = Error | String;

interface get {
    (k: string): IO.IO<O.Option<string>>;
}
const get:get = (key) => 
    F.pipe(
        process.env[key],
        O.fromNullable,
        IO.of
    )

export const debug = get('NODE_ENV');

interface isDev {
    (): Debug;
}
const isDev:isDev = F.pipe(
    debug,
    IO.map(
        O.fold(
            F.constFalse,
            val => S.Eq.equals('development', val)
        )
    )
);

interface trace {
    (msg: Msg): void;
}


export const trace:trace = F.flow(
    (msg) => 
        B.fold(
            F.constVoid, 
            C.error(msg)
        )(isDev())
);