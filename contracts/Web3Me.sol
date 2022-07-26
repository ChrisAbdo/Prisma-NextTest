// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Web3Me {
    string public name;
    uint256 public imageCount = 0;
    mapping(uint256 => Image) public images;

    struct Image {
        uint256 id;
        string hash;
        string description;
        uint256 tipAmount;
        address payable author;
        uint256 likeCount;
        uint256 uploadTime;
    }

    event ImageCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author,
        uint256 likeCount,
        uint256 uploadTime
    );

    event ImageTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author,
        uint256 likeCount,
        uint256 uploadTime
    );

    event ImageLiked(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author,
        uint256 likeCount,
        uint256 uploadTime
    );

    constructor() {
        name = "Web3Me";
    }

    function uploadImage(string memory _imgHash, string memory _description)
        public
    {
        // Make sure the image hash exists
        require(bytes(_imgHash).length > 0);
        // Make sure image description exists
        require(bytes(_description).length > 0);
        // Make sure uploader address exists
        require(msg.sender != address(0));

        // Increment image id
        imageCount++;

        // Add Image to the contract
        images[imageCount] = Image(
            imageCount,
            _imgHash,
            _description,
            0,
            payable(msg.sender),
            0,
            block.timestamp
        );
        // Trigger an event
        emit ImageCreated(
            imageCount,
            _imgHash,
            _description,
            0,
            payable(msg.sender),
            0,
            block.timestamp
        );
    }

    function tipImageOwner(uint256 _id) public payable {
        // Make sure the id is valid
        require(_id > 0 && _id <= imageCount);
        // Fetch the image
        Image memory _image = images[_id];
        // Fetch the author
        address payable _author = _image.author;
        // Pay the author by sending them Ether
        payable(address(_author)).transfer(msg.value);
        // Increment the tip amount
        _image.tipAmount = _image.tipAmount + msg.value;
        // Update the image
        images[_id] = _image;
        // Trigger an event
        emit ImageTipped(
            _id,
            _image.hash,
            _image.description,
            _image.tipAmount,
            _author,
            _image.likeCount,
            _image.uploadTime
        );
    }

    function likeImage(uint256 _id) public payable {
        require(_id > 0 && _id <= imageCount);
        Image memory _image = images[_id];
        address payable _author = _image.author;
        payable(address(_author)).transfer(msg.value);

        _image.likeCount = _image.likeCount + msg.value;
        images[_id] = _image;

        // Trigger an event
        emit ImageLiked(
            _id,
            _image.hash,
            _image.description,
            _image.tipAmount,
            _author,
            _image.likeCount,
            _image.uploadTime
        );
    }
}
