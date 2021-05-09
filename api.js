const Configstore = require('configstore')
const chalk = require('chalk')
const packageJson = require('./package.json')
const getTagBySha = require('./lib/get_tag_by_sha')
const gitGetShaByBranch = require('./lib/git/get_sha_by_branch')
const gitGetTags = require('./lib/git/get_tags')

const getVersionFromConfig = async ({token} = {}) => {
  const config = new Configstore(packageJson.name)

  const versions = config.get('versions')

  // only make x parallel requests?
  return await Promise.all(
    versions.map(async (v) => {
      if (v.header) return ['', chalk.green(v.header), '', '']
      const version = await getVersion({token, owner: v.owner, repo: v.repo, branch: v.branch})
      return [v.owner, v.repo, v.branch, version]
    })
  )
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
