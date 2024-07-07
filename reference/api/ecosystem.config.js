module.exports = {
  apps : [{
    name: 'zhufengketang-api',
    script: './node_modules/.bin/ts-node',
    args:"-T -r tsconfig-paths/register ./src/index.ts"
  }]
}
