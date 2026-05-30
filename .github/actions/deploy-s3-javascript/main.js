const core = require('@actions/core')
const github = require('@actions/github') // gives extra data
const exec = require('@actions/exec')

// Note Custom Javascript actions must include all the code and all the dependencies, so node_modules are also pushed
async function run() {
  // 1) Get some input values
  const bucket = core.getInput('bucket', { required: true })
  const bucketRegion = core.getInput('bucket-region',{ required:true })
  const distFolder = core.getInput('dist-folder',{ required:true })

  // 2) Upload files
  // exec.exec('aws s3 sync <local-folder> <s3-bucket>')
  const s3Uri = `s3://${bucket}`
//   const process = require('process');

// console.log('cwd:', process.cwd());

// await exec.exec('pwd');
// await exec.exec('find', ['.', '-maxdepth', '2', '-type', 'd']);
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)

  const websiteUrl = `http://${bucket}.s3-website.${bucketRegion}.amazonaws.com`
  core.setOutput('website-url', websiteUrl) //::set-output deprecated, check documentation

}

run()