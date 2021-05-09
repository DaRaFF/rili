const api = require('./api')
const tab = require('tab')
const chalk = require('chalk')

// Input comes from config file like this:
// {
//   versions: [
//     { "header": "UPSTREAM master" },
//     { "owner": "livingdocsIO", repo: "livingdocs-editor", branch: "master"},
//     { "owner": "livingdocsIO", repo: "livingdocs-server", branch: "master"},
//     { "header": "BLUEWIN master" },
//     { "owner": "livingdocsIO", repo: "livingdocs-bluewin-server", branch: "master"},
//     { "owner": "livingdocsIO", repo: "livingdocs-bluewin-editor", branch: "master"}
//   ]
// }
module.exports = async ({token} = {}) => {

  const result = await api.getVersionFromConfig({token})
  const tabResultFormat = result.map(item => {
    if (item.type === 'data') return [item.value.owner, item.value.repo, item.value.branch, item.value.version]
    if (item.type === 'header') return ['', chalk.green(item.value), '', '']
    return item
  })

  // return json or tabbed table?
  // emit table on cli script and return here a json format?
  tab.emitTable({
    'columns': [
      {label: 'OWNER', width: 15, align: 'right'},
      {label: 'REPO', width: 25, align: 'left'},
      {label: 'BRANCH', width: 15, align: 'right'},
      {label: 'TAG', align: 'left'}
    ],
    'rows': tabResultFormat
  })
}
