import bcrypt from 'bcrypt';

class HashGenetator {
  private saltRounds: number;
  private secret: string;

  constructor() {
    this.saltRounds = 10;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.secret = process.env.HASH_SECRET!;

    this.passwordToHash = this.passwordToHash.bind(this);
  }

  passwordToHash(password: string) {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }
}

export default new HashGenetator();
