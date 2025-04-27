// import { NextFunction, Request, Response } from "express";
// import { findUser } from "../bzl/api/authApi";

// export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
//   const externalId = req.body.externalId;
//   if (!externalId) {
//     res.status(400).json({ error: 'externalId is required' });
//   }
//   findUser(externalId)
//   .then(user => {
//     req.user = user;
//     next();
//   })
//   .catch(error => {
//     console.error('Error finding user:', error);
//     res.status(404).json({ error: 'User not found' });
//   });
// }