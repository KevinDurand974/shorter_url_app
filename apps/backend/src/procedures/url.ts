import { router, publicProcedure } from '../trpc';

export const testRouter = router({
  test: publicProcedure.query(() => {
    return 'ok base';
  }),
});
