import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';


/**
 * User schema for managing user data.
 */
const userSchema = new Schema(
	{
		// Define the 'password' field with type String and it is required
		password: {
			type: String,
			required: true,
		},
		// Define the 'name' field with type String and it is required
		name: {
			type: String,
			required: true,
		},
		// Define the 'phoneNumber' field with type String and it is required, and should be unique
		phoneNumber: {
			type: String,
			required: true,
			unique: true,
		},
		// Define the 'dob' field with type Date and it is required
		dob: {
			type: String,
			required: true,
		},
		// Define the 'pic' field with type String and it is required
		pic: {
			type: String,
			required: true,
		},
		// Define the 'place' field with type String and it is required
		place: {
			type: String,
			required: true,
		},
		// Define the 'age' field with type Number and it is required
		age: {
			type: Number,
			required: true,
		},
		// Define the 'email' field with type String, it is required, and should be unique
		email: {
			type: String,
			required: true,
			unique: true,
		},
		// Define the 'access' field with type Boolean and it is required, default value is true
		access: {
			type: Boolean,
			default: true,
		},
		// Define the 'delete' field with type Boolean and it is required, default value is false
		delete: {
			type: Boolean,
			default: false,
		},
		// Define the 'created' field with type Date
		created: {
			type: Date,
		},
		// Define the 'status' field with type String and allowed values are ["active", "inactive", "blocked", "deleted"]
		status: {
			type: String,
			enum: ['active', 'inactive', 'blocked', 'deleted'],
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
		// Define the 'updated' field with type Date and default value Date.now
		updated: {
			type: Date,
			default: Date.now,
		},
	},
	{
		// Define the timestamps option to automatically generate 'created' and 'updated' fields
		timestamps: {
			createdAt: 'created',
			updatedAt: 'updated',
		},
	},
);

// Defining a method to compare entered password with user's password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Hashing the password before saving the user
userSchema.pre('save', async function (next) {
	if (!this.isModified) {
		next();
	}

	// Generating a salt and hashing the password
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = model('User', userSchema);

export default User;
