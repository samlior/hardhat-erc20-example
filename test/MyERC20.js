const MyERC20 = artifacts.require('MyERC20')
const settings = require('../deploy/deploySettings')

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe('MyERC20 contract', function () {
  let accounts
  let deployer
  let accountA
  let erc20

  before(async function () {
    accounts = await web3.eth.getAccounts()
    deployer = accounts[0]
    accountA = accounts[1]
  })

  describe('Deployment', function () {
    it('Should deploy with the right params', async function () {
      erc20 = await MyERC20.new(settings.name, settings.symbol, settings.decimals)
      assert.equal(await erc20.name(), settings.name)
      assert.equal(await erc20.symbol(), settings.symbol)
      assert.equal(await erc20.decimals(), settings.decimals)
      assert.equal(await erc20.hasRole(await erc20.MINTER_ROLE(), deployer), true)
      assert.equal(await erc20.hasRole(await erc20.PAUSER_ROLE(), deployer), true)
      assert.equal(await erc20.hasRole(await erc20.DEFAULT_ADMIN_ROLE(), deployer), true)
    })
  })

  describe('Interactive', function () {
    it('Should mint successfully', async function () {
      await erc20.mint(deployer, 100)
      assert.equal(await erc20.balanceOf(deployer), 100)
      assert.equal(await erc20.totalSupply(), 100)
    })

    it('Should mint failed', async function () {
      try {
        await erc20.mint(accountA, 100, { from: accountA })
      } catch (err) {
        return
      }
      assert.fail('Should mint failed')
    })

    it('Should transfer successfully', async function () {
      await erc20.transfer(accountA, 10)
      assert.equal(await erc20.balanceOf(deployer), 90)
      assert.equal(await erc20.balanceOf(accountA), 10)
      assert.equal(await erc20.totalSupply(), 100)
    })

    it('Should transfer failed', async function () {
      try {
        await erc20.transfer(accountA, 100)
      } catch (err) {
        return
      }
      assert.fail('Should transfer failed')
    })

    it('Should burn successfully', async function () {
      await erc20.burn(10)
      assert.equal(await erc20.balanceOf(deployer), 80)
      assert.equal(await erc20.totalSupply(), 90)
    })

    it('Should burn failed', async function () {
      try {
        await erc20.burn(100)
      } catch (err) {
        return
      }
      assert.fail('Should burn failed')
    })
  })
})
