import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as sessionService from '../services/sessionService';
import passport from 'passport';

require('./../middlewares/passport')(passport);

const router = Router();

/**
 * POST /api/sessions
 */
router.post('/', (req, res, next) => {
  sessionService
    .login(req.body.email, req.body.password)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/sessions
 */
router.delete('/:token', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  sessionService
    .deleteToken(req.params.token)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
