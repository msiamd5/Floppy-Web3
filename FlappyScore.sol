// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlappyScore {
    mapping(address => uint256) public highScores;

    function submitScore(uint256 score) public {
        if (score > highScores[msg.sender]) {
            highScores[msg.sender] = score;
        }
    }
}
