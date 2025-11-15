import { createMachine } from "xstate";
export const fileMachine = createMachine(
  {
    id: "archivos",
    type: "parallel",
    states: {
      download: {
        initial: "inicial",
        states: {
          inicial: {
            on: {
              INIT_DOWNLOAD: [
                {
                  target: "cargando",
                  actions: [],
                },
              ],
            },
          },
          cargando: {
            on: {
              DOWNLOAD_COMPLETE: [
                {
                  target: "terminado",
                  actions: [],
                },
              ],
            },
          },
          terminado: {},
        },
      },
      upload: {
        initial: "inicial",
        states: {
          inicial: {
            on: {
              INIT_UPLOAD: [
                {
                  target: "cargando",
                  actions: [],
                },
              ],
            },
          },
          cargando: {
            on: {
              UPLOAD_COMPLETE: [
                {
                  target: "terminado",
                  actions: [],
                },
              ],
            },
          },
          terminado: {},
        },
      },
    },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  },
);