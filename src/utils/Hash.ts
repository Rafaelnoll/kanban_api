import bcrypt from 'bcrypt';

class Hash {
  private saltRounds: number;

  constructor() {
    this.saltRounds = 10;
    this.passwordToHash = this.passwordToHash.bind(this);
  }

  passwordToHash(password: string) {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  comparePasswordWithHas(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}

export default new Hash();
