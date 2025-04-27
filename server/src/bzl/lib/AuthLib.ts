// import { UserModel } from "../../models/lib/UserModel";
// import * as jwt from 'jsonwebtoken';
// import { LoginRequest, RegisterRequest, UserContext, UserInfo } from "../../types";
// import * as bcrypt from 'bcryptjs';
// import _ from "lodash";
// import { UserModelType } from "../../models/types";
// import { BadRequest, NotFound, Unauthorized } from "../../errors/CustomErrors";
// import { config } from "../../config/config";

// /** Class used to manage everything authentication related. */
// export class AuthLib {
//     private userModel: UserModel;
//     private hashSalt: string;

//     constructor(userModel: UserModel, hashSalt: string) {
//         this.userModel = userModel;
//         this.hashSalt = hashSalt;
//     }

//     /**
//      * Method used to login a user.
//      * 
//      * @param {LoginRequest} form login form send by user.
//      * @returns {string} jwt token.
//      */
//     // async login(form: LoginRequest): Promise<string> {
//     //     return this.userModel.findOneWithPassword({ email: form.email })
//     //         .then(async (user) => {
//     //             if(_.isNil(user)) {
//     //                 throw new NotFound('User not found!');
//     //             }
//     //             const passwordsMatch = await this.comparePasswords(form.password, user.password);

//     //             if(!passwordsMatch) {
//     //                 throw new BadRequest('Incorrect password!');
//     //             }
//     //             const token = this.generateToken(user);
//     //             return token;
//     //         })
//     // }

//     /**
//      * Method used to register a user.
//      * 
//      * @param {RegisterRequest} form registration form sent by user.
//      * @returns {UserModelType} registered user data.
//      */
//     // async register(form: RegisterRequest): Promise<UserModelType> {
//     //     if(form.password !== form.confirmPassword)
//     //         throw new BadRequest('Passwords dont match!');


//     //     const user: UserInfo = {
//     //         fullName: form.name,
//     //         password: await this.hashPassword(form.password),
//     //         email: form.email
//     //     };

//     //     return this.userModel.findOne({ email: user.email })
//     //         .then((foundUser) => {
//     //             if(!_.isNil(foundUser))
//     //                 throw new BadRequest('User already exists');
//     //             return this.userModel.create(user as UserModelType);
//     //         })
//     // }
//     async register(form: RegisterRequest): Promise<UserModelType> {
//         const user: UserInfo = {
//             email: form.email,
//             externalId: form.externalId,
//         };

//         return this.userModel.findOne({ id: user.id })
//             .then((foundUser) => {
//                 if(!_.isNil(foundUser))
//                     throw new BadRequest('User already exists');
//                 return this.userModel.create(user as UserModelType);
//             })
//     }


//     /**
//      * Method used in order to decode the jwt token.
//      * 
//      * @param {string} token jwt token.
//      * @returns {UserContext} details about the user.
//      */
//     verifyToken(token: string): UserContext {
//         try{
//             const payload: any = jwt.verify(token, config.jwt_secret);
    
//             const context: UserContext = {
//                 id: payload.id,
//                 email: payload.email,
//             }
    
//             return context;
//         } catch (error) {
//             throw new Unauthorized('Invalid token!');
//         }
//     }

//     async findUser(username: string, password: string) {
//         const user = await this.userModel.findOne({ username: username });
//         // if(!_.isNil(user)) {
//             // if(bcrypt.compareSync(password, user.password)) {
//             //     return user;
//             // } else {
//             //     throw Error('Incorrect password');
//             // }
//         // } else {
//         //     throw Error('User not found');
//         // }
//     }

//     /**
//      * Method used to hash passwords.
//      * 
//      * @param {string} password original password.
//      * @returns {Promise<string>} hashed password
//      */
//     public hashPassword(password: string): Promise<string> {
//         return bcrypt.hash(password, this.hashSalt);
//     }

//     /**
//      * Method used to compare a password to a hashed password.
//      * 
//      * @param {string} password normal text password.
//      * @param {string} hashedPassword hashed password.
//      * @returns {Promise<boolean>} true if equal, false if not.
//      */
//     private comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
//         return bcrypt.compare(password, hashedPassword);
//     }

//     /**
//      * Method used in order to generate ta json web token.
//      * 
//      * @param {UserModelType} user user object.
//      * @returns {string} jwt token.
//      */
//     private generateToken(user: UserModelType): string {
//         return jwt.sign({ id: user.id, email: user.email }, config.jwt_secret, { expiresIn: '24h' });
//     }

// }