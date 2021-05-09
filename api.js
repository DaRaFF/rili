const Configstore = require('configstore')
const packageJson = require('./package.json')
const getTagBySha = require('./lib/get_tag_by_sha')
const gitGetShaByBranch = require('./lib/git/get_sha_by_branch')
const gitGetTags = require('./lib/git/get_tags')

// @returns
// [
//   { type: 'header', value: 'UPSTREAM release-2021-03' },
//   { type: 'data', value: {owner: 'livingdocsIO', repo: 'livingdocs-server', branch: 'release-2021-03', version: 'v124.5.41'}},
//   { type: 'data', value: {owner: 'livingdocsIO', repo: 'livingdocs-editor', branch: 'release-2021-03', version: 'v63.8.48'}},
//   { type: 'header', value: 'UPSTREAM release-2020-12' },
//   ...
//   {
// ]
const getVersionFromConfig = async ({token} = {}) => {
  const config = new Configstore(packageJson.name)

  const versions = config.get('versions')

  // only make x parallel requests?
  const result = await Promise.all(
    versions.map(async (v) => {
      if (v.header) return {type: 'header', value: v.header}
      const version = await getVersion({token, owner: v.owner, repo: v.repo, branch: v.branch})
      return {type: 'data', value: {owner: v.owner, repo: v.repo, branch: v.branch, version}}
    })
  )
  return result
}

const getVersion = async ({token, owner, repo, branch} = {}) => {
  const tags = await gitGetTags({owner, repo, token})
  const sha = await gitGetShaByBranch({owner, repo, token, branch})

  // get latest tag by branch
  const tag = getTagBySha({tags, sha})
  if (!tag) {
    return `no tag found in branch '${branch}'`
  }
  return tag
}

api = {
  getVersion,
  getVersionFromConfig
}

// TODO: do not only search by the latest commit, go back in history until you find a tag
module.exports = api
