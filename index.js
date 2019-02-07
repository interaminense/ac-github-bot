const getConfig = require('probot-config')

const DEFAULT_OPTS = {
  "auto_forward" : true,
  "auto_forward_username": "brianchandotcom",
  "manual_review_required": true,
  "reviewers": {
    "ASAH" : ["shinnlok"],
    "FARO" : ["shinnlok"],
    "CEREBRO": ["marcellustavares"]
  }
}

module.exports = app => {

  app.on('check_suite.completed', async context => {
    console.log('on check_suite completed status', context.payload.check_suite.conclusion);
  })

  app.on('pull_request', async context => {
    console.log('on pull request');
  })

  app.on('pull_request.reopened', async context => {
    let config = await getConfig(context, 'ac_bot.yml', DEFAULT_OPTS)

    console.log('config', config);

    const commits = await context.github.pullRequests.listCommits(context.repo({
      number: context.payload.pull_request.number
    }))

    const files = await context.github.pullRequests.listFiles(context.repo({
      number: context.payload.pull_request.number
    }))

    const tickets = commits.data.map(element => element.commit).map(commit => commit.message)

    console.log('commits', tickets);
    
   })

  

}
