const Configstore = require('configstore')
const packageJson = require('./package.json')
const getVersion = require('./get-version')
const tab = require('tab')

// Input comes from config file like this:
// {
//   versions: [
//     {owner: 'livingdocsIO', repo: 'livingdocs-editor', branch: 'master'},
//     {owner: 'livingdocsIO', repo: 'livingdocs-server', branch: 'master'},
//     {owner: 'livingdocsIO', repo: 'livingdocs-bluewin-server', branch: 'master'},
//     {owner: 'livingdocsIO', repo: 'livingdocs-bluewin-editor', branch: 'master'}
//   ]
// }
module.exports = async ({token} = {}) => {

  const config = new Configstore(packageJson.name)

  const versions = config.get('versions')

  // only make x parallel requests?
  const versionsResult = await Promise.all(
    versions.map(async (v) => {
      const version = await getVersion({token, owner: v.owner, repo: v.repo, branch: v.branch})
      return [v.owner, v.repo, v.branch, version]
    })
  )

  // return json or tabbed table?
  // emit table on cli script and return here a json format?
  tab.emitTable({
    'columns': [
      {label: 'OWNER', width: 15, align: 'right'},
      {label: 'REPO', width: 25, align: 'left'},
      {label: 'BRANCH', width: 15, align: 'right'},
      {label: 'TAG', align: 'left'}
    ],
    'rows': versionsResult
  })
}
