exports.getHomepage = function(req, res) {
    res.render("homepage");
}

exports.getRegistration = function(req, res) {
    res.render("registration");
}

exports.getLogin = function(req, res) {
    res.render("login", { message: "&nbsp;" });
}