// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const OffsetHelperWrapper = await hre.ethers.getContractFactory("OffsetHelperWrapper");
  const offsetHelperWrapper = await OffsetHelperWrapper.deploy();

  await offsetHelperWrapper.deployed();

  console.log("offsetHelperWrapper deployed to:", offsetHelperWrapper.address);

  NCT_address = "0xD838290e877E0188a4A44700463419ED96c16107";
  NCT_whale = "0xa895f5E48e91BD314ab146bD235b4345f657f497";

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [NCT_whale],
  });

  let signer = await ethers.provider.getSigner(NCT_whale);
  signer.address = signer._address;

  // TODO: Find a better way that this hack. If you get an error that the ERC20 abi is not found run `npx hardhat compile`
  // to compile Erc20Dummy.sol in order to generate it.
  const IERC20_ABI = "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20";

  nctContract = await hre.ethers.getContractAt(
    IERC20_ABI,
    NCT_address,
    signer
  );
  nctContract = nctContract.connect(signer);

  console.log(
    "Signer NCT balance:",
    ethers.utils.formatEther(await nctContract.balanceOf(signer.address))
  );

  const accounts = await ethers.getSigners();
  await nctContract.transfer(
    accounts[1].address,
    ethers.utils.parseEther("10")
  );
  balance = await nctContract.balanceOf(accounts[1].address);
  console.log("NCT balance: ", ethers.utils.formatEther(balance));

  const offset_helper_address = "0x7229F708d2d1C29b1508E35695a3070F55BbA479";
  const offset_helper_abi = "contracts/interfaces/IOffsetHelper.sol:IOffsetHelper";

  offset_helper_contract = await hre.ethers.getContractAt(
    offset_helper_abi,
    offset_helper_address,
    signer
  );


  const amount_nct = ethers.utils.parseEther("1.0")
  const amount_matic = await offset_helper_contract.calculateNeededETHAmount(NCT_address, amount_nct);

  console.log( "Offsetting 1 NCT requires", ethers.utils.formatEther(amount_matic) );

  offsetHelperWrapper.offsetWrapper(NCT_address, amount_nct, {value: amount_matic});
  console.log( "Done." );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
