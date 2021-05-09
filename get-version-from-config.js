const api = require('./api')
const tab = require('tab')

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

  const versionsResult = await api.getVersionFromConfig({token})

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
