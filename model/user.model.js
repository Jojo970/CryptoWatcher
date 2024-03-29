const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = mongoose.Schema(
    {
        username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
        },
        email: {
        type: String,
        required: [true, 'email is required'],
        },
        password: {
        type: String,
        required: [true, 'password is required'],
        },
    },
    { timestamps: true },
);

UserSchema.pre('save', async function (next) {
    console.log('IN PRE SAVE:', this.password);
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        console.log('HASHED:', hashedPassword);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log('ERROR IN SAVE', error);
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);