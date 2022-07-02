const VendingMachine = artifacts.require("VendingMachine");

contract("VendingMachine", (accounts) => {
  before(async () => {
    instance = await VendingMachine.deployed();
  });

  it("ensures that the starting balance of the vending machine is 100", async () => {
    let balance = await instance.getVendingMachineBalance();
    assert.equal(balance, 100, "The initial balance should be 100 donuts.");
  });

  it("ensures the balance of the vending machine can be updated", async () => {
    await instance.restock(100);
    let balance = await instance.getVendingMachineBalance();
    assert.equal(
      balance,
      200,
      "The balance should be 200 dounuts after restocking."
    );
  });

  it("allows donuts to be purchased", async () => {
    await instance.purchase(1, {
      from: accounts[0],
      value: web3.utils.toWei("0.03", "ether"),
    });
    let balance = await instance.getVendingMachineBalance();
    assert.equal(balance, 199, "The balance should be 199 dounuts after sale.");
  });
});
