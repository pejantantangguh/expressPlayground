const express = require(express);
const app = express()

const routing = () => {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
}

module.exports = routing;