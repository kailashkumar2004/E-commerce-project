const { errorHandler } = require("../halpers/errorHandling");

exports.wrapAsync = fn => {
    return (req, res) => {
        return fn(req, res)
            .then(r => {
                if (r.render == "invoice") { res.render("invoice", r.data) }
                if (r && r.render == "invoice") { res.render("invoice", r.data) }
                else res.status(200).send(r);
            })
            .catch(err => {
                console.log(err);
                const response = errorHandler(err);
                res.status(response.status).send(response);
            });
    };
};

