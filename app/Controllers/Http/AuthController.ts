import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
// import User from 'App/Models/User';
import UserRepo from 'App/Repository/UserRepo';

export default class AuthController extends UserRepo {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');
    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '10 days',
    });
    return token.toJSON();
  }

  public async register({ request, auth }: HttpContextContract) {
    const newUserSchema = schema.create({
      first_name: schema.string({ trim: true }),
      last_name: schema.string({ trim: true }),
      username: schema.string({}, [rules.unique({ table: 'users', column: 'username' })]),
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      address: schema.string({ trim: true }),
      contact_number: schema.string({ trim: true }),
      password: schema.string({}, [rules.minLength(8)]),
    });

    const payload = await request.validate({
      schema: newUserSchema,
      messages: {
        'required': 'The {{ field }} is required to create a new account',
        'username.unique': 'Username has been used',
        'email.unique': 'Email has been used',
        'password.minLength': 'Password must be at least 8 characters long',
      },
    });

    // const user = new User();

    // user.first_name = payload.first_name;
    // user.last_name = payload.last_name;
    // user.username = payload.username;
    // user.email = payload.email;
    // user.address = payload.address;
    // user.contact_number = payload.contact_number;
    // user.password = payload.password;

    const data = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      username: payload.username,
      email: payload.email,
      address: payload.address,
      contact_number: payload.contact_number,
      password: payload.password,
    };
    const user = await this.createModel(data);
    // await user.save();
    const token = await auth.use('api').login(user, {
      expiresIn: '10 days',
    });
    return token.toJSON();
  }
}
