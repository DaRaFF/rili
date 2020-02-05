const tap = require('tap')
const getTagBySha = require('../lib/get_tag_by_sha')

const tags = [
  { ref: 'refs/tags/v0.1.0',
    object: { 
      sha: '3d57c635c349f87d7beb2db21f7f56515dba0e99',
      type: 'tag'
    } 
  },
  { ref: 'refs/tags/v0.2.0',
    object: { 
      sha: '9790de3f40aa014590c58c0ccecb3c946d47086b',
      type: 'tag'
    } 
  }
]

const tag = getTagBySha({tags, sha: '9790de3f40aa014590c58c0ccecb3c946d47086b'})
tap.equal(tag, 'v0.2.0')

const notMatchingSha = getTagBySha({tags, sha: 'not-existing-sha'})
tap.equal(notMatchingSha, false)