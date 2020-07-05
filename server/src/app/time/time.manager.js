export const getServerTime = async(request) => {

    const time = new Date().getTime() / 1000;

    return {
        epoch: time
    };
};
