// EMAIL
export const isValidEmail = (email: string): boolean => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// PASSWORD (niveau correct pour app standard)
export const isValidPassword = (password: string): boolean => {
	return password.length >= 4 && password.length <= 10;
};

// PASSWORD strong (option pro)
export const isStrongPassword = (password: string): boolean => {
	return /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/.test(password);
};
