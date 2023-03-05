const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');

const myFirstSecret = process.env.FIRST_SECRET_KEY;


module.exports.findAllUsers = (req, res) => {
  User.find()
    .then(allDaUsers => res.json({ users: allDaUsers }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleUser = (req, res) => {
	User.findOne({ _id: req.params.id })
		.then(oneSingleUser => res.json({ user: oneSingleUser }))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.register = (req, res) => {
  User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, myFirstSecret);

        res
            .cookie("usertoken", userToken, myFirstSecret, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user });
    })
    .catch(err => res.status(400).json({ error: err }));
}


module.exports.login = async(req, res) => {

  const user = await User.findOne({ email: req.body.email });

    if(user === null) {
        // email not found in users collection
        return res.status(400).json({error: "Invalid username or password"})
    }
 
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.status(400).json({error: "Invalid username or password"})
    }
 
    const userToken = jwt.sign({
        id: user._id
    }, myFirstSecret);
    
     res
        .cookie("usertoken", userToken, myFirstSecret, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}

module.exports.getUser = (req, res) =>{
  const decoded = jwt.decode(req.cookies.usertoken, {complete: true})
  User.findOne({_id: decoded.payload.id})
    .then(oneUser=>res.json(oneUser))
    .catch(err=>res.status(500).json(err))
}

module.exports.updateExistingUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedUser => res.json({ user: updatedUser }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.logout = (req, res) =>{
  res.clearCookie("usertoken")
  console.log("cookie cleared")
  res.json({ msg: "Cookie deleted."})
}
