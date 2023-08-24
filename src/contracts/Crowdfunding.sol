// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        string imagePath;
        uint goal;
        uint current;
        uint startedIn;
        address[] donators;
        uint[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint public currentIndex = 0;

    function createCampaign(address _owner, string memory _title, string memory _description,
        uint256 _goal, string memory _imagePath) external returns (uint) {
        
        Campaign storage newCampaign = campaigns[currentIndex];

        newCampaign.owner = _owner;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.imagePath = _imagePath;
        newCampaign.goal = _goal;
        newCampaign.current = 0;
        newCampaign.startedIn = block.timestamp;

        currentIndex++;

        return currentIndex-1;
    }

    function donate(uint campaignIndex) external payable{
        Campaign storage campaign = campaigns[campaignIndex];

        (bool sent,) = payable(campaign.owner).call{value: msg.value}("");

        require(sent, "Donation failed");
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.current = campaign.current + msg.value;
    }

    function getDonators(uint campaignIndex) external view returns(address[] memory, uint[] memory) {
        return (campaigns[campaignIndex].donators, campaigns[campaignIndex].donations);
    }

    function getCampaigns() external view returns(Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](currentIndex);

        for(uint i = 0; i < currentIndex; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

}