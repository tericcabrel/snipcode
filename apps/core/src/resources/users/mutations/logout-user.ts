import { MutationResolvers } from '../../../types/graphql';
import { COOKIE_NAME } from '../../../utils/constants';

export const logoutUser: MutationResolvers['logoutUser'] = async (_parent, _args, context) => {
  const { req, res } = context;

  res.clearCookie(COOKIE_NAME);

  return new Promise((resolve) => {
    req.session.destroy((err) => {
      return resolve(!err);
    });
  });
};
