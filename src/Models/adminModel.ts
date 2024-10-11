import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
	// Define the 'email' field with type String and it is required and should be unique
	email: {
		type: String,
		required: true,
		unique: true,
	},
	// Define the 'name' field with type String
	name: {
		type: String,
	},
	// Define the 'pic' field with type String and it is required
	pic: {
		type: String,
		required: true,
	},
	// Define the 'password' field with type String and it is required
	password: {
		type: String,
		required: true,
	},
	// Define the 'token' field as an array of objects
	token: [
		{
			// Define the 'id' field with type String
			id: String,
			// Define the 'token' field with type String
			token: String,
			// Define the 'created' field with type Date
			created: Date,
			// Define the 'device' field with type String
			device: String,
			// Define the 'lastLogin' field with type Date
			lastLogin: Date,
			// Define the 'status' field with type String and allowed values are ["active", "inactive"]
			status: {
				type: String,
				enum: ['active', 'inactive'],
			},
		},
	],
});

const Admins = model('Admin', adminSchema);

export default Admins;
