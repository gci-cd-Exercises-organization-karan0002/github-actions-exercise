const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

// Note Custom Javascript actions must include all the code and all the dependencies, so node_modules are also pushed
async function run() {
  core.notice('Hello from my custom Javascript Action!')
}

run()