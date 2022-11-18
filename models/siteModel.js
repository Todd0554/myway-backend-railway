import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
})

const siteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false
    },
    comments: [commentSchema],
    numComments: {
        type: Number,
        require: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true,
        default: 0
    },
    lng: {
        type: Number,
        required: true,
        default: 0
    }
},
{
    timestamps: true,
})

const Site = mongoose.model('Site', siteSchema)

export default Site