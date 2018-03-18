module.exports = {
    signin(req, res){
        res.redirect('/signin.html');
    },

    signup(req, res){
        res.redirect('/signup.html');
    },

    logout: (req, resp) => {
        req.session.destroy(function (err) {
            resp.redirect('/signin');
        });
    }
};