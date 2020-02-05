const _ = require('lodash')

// @return 'v0.2.0' || false
module.exports = ({tags, sha}) => {
  const tagMatch = _.find(tags, function (t) { return t.object.sha === sha })

  return tagMatch && tagMatch.ref.substring(10)
    ? tagMatch.ref.substring(10)
    : false
}
