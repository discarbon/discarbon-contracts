// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

interface IOffsetHelper {

    function calculateNeededETHAmount(
                                      address _poolToken,
                                      uint256 _amountToOffset
                                      ) external view returns (uint256);

    function autoOffset(
                        address _depositedToken,
                        address _poolToken,
                        uint256 _amountToOffset
                        )
        external;

    function autoOffset(
                        address _poolToken,
                        uint256 _amountToOffset
                        )
        external
        payable;

}
