const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{

    },
    email:{

    },
    password:{

    },
    profession:{

    }
},{timestamps:true}
);

module.exports = mongoose.model('UserModel', UserSchema);