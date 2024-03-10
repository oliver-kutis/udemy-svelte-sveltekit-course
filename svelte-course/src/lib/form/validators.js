export const validateRequiredField = (value, label = 'Field') => {
	let error;
	if (!value) {
		error = `${label} is required`;
	}
	return error;
};
export const validateEmail = (value, label = 'Email') => {
	let error;
	if (!/\S+@\S+\.\S+/.test(value)) {
		error = `${label} address is invalid`;
	}
	return error;
};

export const validateMinLength = (value, label = 'Field', minLength = 4) => {
	let error;
	if (value.length < minLength) {
		error = `${label} must be at least ${minLength} characters`;
	}
	return error;
};
export const validatePassword = (value, label = 'Password') => {
	let error;
	if (
		!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
			value,
		)
	) {
		error = `${label} must have one uppercase letter, one lowercase letter, one number, and one special character`;
	}

	return error;
};
// function validateForm(formObj) {
// 	// create a function that will validate username, password, and email
// 	// return an object with the errors
// 	// if there are no errors, return an empty object
// 	const errors = {};
// 	// Username
// 	if (!formObj.username) {
// 		errors.username = 'Username is required';
// 	}
// 	if (formObj.username.length < 4) {
// 		errors.username = 'Username must be at least 4 characters';
// 	}
// 	// Email
// 	if (!formObj.email) {
// 		errors.email = 'Email is required';
// 	}
// 	if (!/\S+@\S+\.\S+/.test(formObj.email)) {
// 		errors.email = 'Email address is invalid';
// 	}
// 	// Password
// 	if (!formObj.password) {
// 		errors.password = 'Password is required';
// 	}

// 	if (formObj.password.length < 6) {
// 		errors.password = 'Password must be at least 6 characters';
// 	}
// 	// Password must have one uppercase letter, one lowercase letter, one number, and one special character
// 	if (
// 		!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
// 			formObj.password,
// 		)
// 	) {
// 		errors.password =
// 			'Password must have one uppercase letter, one lowercase letter, one number, and one special character';
// 	}
// }
