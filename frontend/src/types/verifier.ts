const verifier = {
  address: "0xcEb16d1aF04BD61A424262B5d0603E9a4cD74A36",
  abi: [
    {
      inputs: [
        { internalType: "uint256[2]", name: "a", type: "uint256[2]" },
        { internalType: "uint256[2][2]", name: "b", type: "uint256[2][2]" },
        { internalType: "uint256[2]", name: "c", type: "uint256[2]" },
        { internalType: "uint256[72]", name: "input", type: "uint256[72]" },
      ],
      name: "verifyProof",
      outputs: [{ internalType: "bool", name: "r", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
  ],
};

export default verifier;
