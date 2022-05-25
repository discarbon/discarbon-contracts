// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./interfaces/IOffsetHelper.sol"; // See https://github.com/ToucanProtocol/example-implementations

/// @title OffsetHelperWrapper: A simple contract to learn and test Toucan's OffsetHelpers from a contract.
/// @author danceratopz
/// @notice xxx
contract OffsetHelperWrapper is Ownable, Pausable {
    // Mainnet Addresses
    address OFFSETHELPER_ADDRESS = 0x7229F708d2d1C29b1508E35695a3070F55BbA479;
    // Use NCT; it represents natural and higher quality carbon certificates.
    // address BCT_ADDRESS = 0x2F800Db0fdb5223b3C3f354886d907A671414A7F;
    address NCT_ADDRESS = 0xD838290e877E0188a4A44700463419ED96c16107;

    // Instantiate ToucanProtocol's OffsetHelper contract.
    IOffsetHelper offsetHelper = IOffsetHelper(OFFSETHELPER_ADDRESS);

    constructor() {}

    /// @notice Call Toucan's offset helper to retire the specified amount of CO2.
    function offsetWrapper(uint256 carbonToCompensate) public payable whenNotPaused() {
        // Call Toucan's autoOffset function to retire/compensate the carbon.
        offsetHelper.autoOffset{value: msg.value}(NCT_ADDRESS, carbonToCompensate);
    }

    /// @notice Pauses the contract. Contract owner only, therefore very minimal function.
    function pauseContract() public onlyOwner() {
        _pause();
    }

    /// @notice Unpauses the contract. Contract owner only, therefore very minimal function.
    function unpauseContract() public onlyOwner() {
        _unpause();
    }

}
