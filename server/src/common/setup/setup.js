import { TimeController } from "../../app/time";
import { MetricsController } from "../../app/metrics";

const registerControllers = app => {
    TimeController(app);
    MetricsController(app);
};

export const setupApp = async app => {
    registerControllers(app);
};
