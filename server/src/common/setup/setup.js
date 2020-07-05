import { TimeController } from '../../app/time';

const registerControllers = app => {
    TimeController(app);
};

export const setupApp = async app => {
    registerControllers(app);
}
