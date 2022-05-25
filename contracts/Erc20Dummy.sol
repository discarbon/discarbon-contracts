// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Erc20Dummy
/// @author danceratopz
/// @notice Created as a hack: Compiling this generates an ERC20 abi that can be used in test-wrapper.js
contract Erc20Dummy is ERC20 {

    constructor(uint256 initialSupply) ERC20("Dummy", "DUM") {
        _mint(msg.sender, initialSupply);
    }
    
}
