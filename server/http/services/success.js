module.exports = (response, data = {}, code = 200) => {
    response.status(code).json(Object.assign(data, {
        message: 'success',
    }));
}