var request = require('request-promise');


// @return
// {
//   "branchName": "release-2018-11",
//   "sha": "ac6b118a3ed5d6762e86054b10e99c5c6c8112c7",
//   "message": "my commit message",
// }
// OR false
module.exports = async ({owner, repo, token}) => {
  try {
    return await request({
      uri: `https://api.github.com/repos/${owner}/${repo}/git/refs/tags`,
      qs: { access_token: token },
      headers: { 'User-Agent': 'Request-Promise' },
      json: true
    })
      
  } catch (error) {
    throw error    
  }
}
