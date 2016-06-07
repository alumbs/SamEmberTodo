import Ember from 'ember';

export function isTodoIndexValid(params/*, hash*/) {
  let value = params[0];

  // console.log("isTodoIndexValid called with " + value);

  return value > 0;
}

export default Ember.Helper.helper(isTodoIndexValid);
