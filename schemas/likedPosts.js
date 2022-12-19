const mongoose = require('mongoose');

const likedPostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    isLike: {
        type: Boolean,
        required: true
    },
},{
    timestamps:true
})

userSchema.virtual("likedPostId").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('LikedPosts', likedPostSchema)