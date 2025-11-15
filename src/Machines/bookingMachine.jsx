import { createMachine, assign, fromPromise} from "xstate";
import { fetchCountries } from "../Utils/api";


const fillCountries = {
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: fromPromise(() => fetchCountries()),
        onDone: {
          target: 'success',
          actions: assign({
            countries: ({event}) => event.output
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: "fallo el request"
          }),
        }
      }
    },
    failure: {
      on: {
        RETRY: {
          target: "loading",
        },
      },
    },
    success: {},
  },
};

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "inicial",
    context: {
      passengers: [],
      selectedCountry: '',
      countries: [],
      error: '',
    },
    states: {
      inicial: {
        on: {
          START: [
            {
              target: "search",
              actions: ['imprimirInicio'],
            },
          ],
        },
      },
      search: {
        entry: 'imprimirEntrada',
        exit: 'imprimirSalida',
        on: {
          CONTINUE: [
            {
              target: "passengers",
              actions: assign({
                selectedCountry: ({event}) => event.selectedCountry,
              }),
            },
          ],
          CANCEL: [
            {
              target: "inicial",
              actions: [],
            },
          ],
        },
        ...fillCountries
      },
      passengers: {
        on: {
          DONE: [
            {
              target: "tickets",
              guard: "moreThanOnePassenger",
            },
          ],
          CANCEL: [
            {
              target: "inicial",
              actions: "cleanContext",
            },
          ],
          ADD: {
            target: 'passengers',
            actions: assign({
              passengers: ({ context, event }) => [...context.passengers, event.newPassengers]
            }),
          }
        },
      },
      tickets: {
        after: {
          5000: {
            target: 'inicial',
            actions: 'cleanContext',
          },
        },
        on: {
          FINISH: [
            {
              target: "inicial",
              actions: 'cleanContext',
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      imprimirInicio: () => console.log('Imprimir inicio'),
      imprimirEntrada: () => console.log('Imprimir Entrada al Search'),
      imprimirSalida: () => console.log('Imprimir Salida del search'),
      cleanContext: assign({
        selectedCountry: '',
        countries: [],
        passengers: [],
      }),
    },
    actors: {},
    guards: {
      moreThanOnePassenger: ({context}) => {
        return context.passengers.length > 0;
      },
    },
    delays: {},
  },
);

export default bookingMachine;