const getTagBySha = require('./lib/get_tag_by_sha')
const gitGetShaByBranch = require('./lib/git/get_sha_by_branch')
const gitGetTags = require('./lib/git/get_tags')

// TODO: do not only search by the latest commit, go back in history until you find a tag
module.exports = async ({token, owner, repo, branch} = {}) => {
  const tags = await gitGetTags({owner, repo, token})
  const sha = await gitGetShaByBranch({owner, repo, token, branch})

  // get latest tag by branch
  const tag = getTagBySha({tags, sha})
  if (!tag) {
    return `no tag found in branch '${branch}'`
  }
  return tag
}
