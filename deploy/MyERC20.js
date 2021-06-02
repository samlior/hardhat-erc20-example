const settings = require('./deploySettings')

module.exports = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const token = await deploy('MyERC20', {
    from: deployer,
    log: true,
    deterministicDeployment: false,
    args: [settings.name, settings.symbol, settings.decimals],
  })
  console.log('MyERC20 deployed on:', token.address)
}
