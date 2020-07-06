export const getServerTime = async() => {

    const time = new Date().getTime() / 1000;

    return {
        epoch: time
    };
};
