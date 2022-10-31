import { router, publicProcedure } from '../configuration';

export const testRouter = router({
  test: publicProcedure.query(() => {
    return 'ok base';
  }),
});
