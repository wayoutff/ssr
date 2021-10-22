import nconf from 'nconf'
import path from 'path'
import fs from 'fs'
import isArray from 'lodash/isArray'
import each from 'lodash/each'
import rootConfig from '../config.json'

let app = process.env.APP
let stage = process.env.STAGE

initNconf(process.env.ROOT_PATH || process.cwd())

function initNconf (dirname) {
  let addNconfFile = (nconf, filename) => {
    let filePath = path.join(dirname, 'configs', filename + '.json')
    if (fs.existsSync(filePath)) {
      nconf.file(filePath)
      return true
    }
    console.log('Warning! APP and/or STATE are provided but config file ' +
        'wasn\'t found: ' + filePath)
    return false
  }

  nconf.env()
  if (app && stage) addNconfFile(nconf, app + '_' + stage)
  else if (stage) addNconfFile(nconf, stage)
  else if (app) addNconfFile(nconf, app)

  nconf.file('private', dirname + '/config.private.json')
  nconf.defaults(rootConfig)

  // Copy stuff required in Derby-part and vendor libs into ENV
  if (isArray(nconf.get('COPY_TO_ENV'))) {
    each(nconf.get('COPY_TO_ENV'), (option) => {
      process.env[option] = nconf.get(option)
    })
  }

  // Copy public env vars into global.env
  if (isArray(nconf.get('PUBLIC'))) {
    global.env = global.env || {}
    each(nconf.get('PUBLIC'), (option) => {
      global.env[option] = nconf.get(option)
    })
  }
}