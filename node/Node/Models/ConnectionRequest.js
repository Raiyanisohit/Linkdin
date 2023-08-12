import mongoose, { Schema } from 'mongoose'

const ConnectionRequest = mongoose.Schema({
    requestUserId: { type: Schema.Types.ObjectId, ref: 'userprofile' }, // A person who request for connection
    userId: { type: Schema.Types.ObjectId, ref: 'userprofile' }, // id of the person who will get the connecion request
    requestStatus: { type: String } // Request status
},
    { timestamps: true }
)

export const connectionrequest = mongoose.model('userrequest', ConnectionRequest)