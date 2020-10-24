import Joi from '@hapi/joi';

import { runAssertionsMongo } from './internals/assertions';

(async function () {
  try {
    let schema;

    // Prepare Joi schema below

    schema = new Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      loginCount: Joi.number(),
      registerDate: Joi.date(),
      commentsAmount: Joi.number()
    }).options({presence: 'required'})

    await runAssertionsMongo(schema);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();