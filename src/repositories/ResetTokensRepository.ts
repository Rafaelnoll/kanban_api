import query from '../database';
import IResetToken from '../interfaces/ResetToken';

class ResetTokenRepository {
  async insert({
    token,
    creation_date,
    expiration_date,
    used,
  }: IResetToken): Promise<IResetToken> {
    const [row] = await query(
      `
      INSERT INTO reset_tokens(token, creation_date, used, expiration_date)
      VALUES($1, $2, $3, $4)
    `,
      [token, creation_date, used, expiration_date],
    );

    return row;
  }

  async findByToken(token: string): Promise<IResetToken> {
    const [row] = await query(
      `
      SELECT *
      FROM reset_tokens
      WHERE token = $1
    `,
      [token],
    );

    return row;
  }

  async setTokenToUsed(token: string) {
    const [row] = await query(
      `
      UPDATE reset_tokens
      SET used = true
      WHERE token = $1
    `,
      [token],
    );

    return row;
  }
}

export default new ResetTokenRepository();
