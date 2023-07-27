const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[0-9a-zA-Z@$!%*?&]{8,16}$/;

class Password {
  validatePasswordWithRegex(password: string): boolean {
    if (password.length < 8 || password.length > 16) {
      return false;
    }

    if (!regex.test(password)) {
      return false;
    }

    return true;
  }

  comparePasswords(password: string, passwordConfirmation: string) {
    return password === passwordConfirmation;
  }
}

export default new Password();
