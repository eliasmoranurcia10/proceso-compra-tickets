import { useMachine } from "@xstate/react";
import bookingMachine from "../Machines/bookingMachine";
import Nav from "../Components/Nav";
import StepsLayout from "./StepsLayout";

import './BaseLayout.css'

const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine);

    console.log('nuestra maquina', state);
    console.log('Me encuentro en :', state.value, state.context);
    /* console.log('matches true', state.matches('inicial'));
    console.log('matches true', state.matches('tickets'));
    console.log('matches true', state.can('FINISH')); */

    return(
        <div className="BaseLayout">
            <Nav state={state} send={send} />
            <StepsLayout state={state} send={send} />
        </div>
    )
}

export default BaseLayout;