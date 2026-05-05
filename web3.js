let signer;
let userAddress;

const connectBtn = document.getElementById("connectBtn");
const walletText = document.getElementById("wallet");
const startBtn = document.getElementById("startBtn");

connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  userAddress = await signer.getAddress();

  walletText.innerText = "Connected: " + userAddress;

  await oneTimeSignup();
  startBtn.disabled = false;
};

async function oneTimeSignup() {
  const key = "signed_" + userAddress;

  if (localStorage.getItem(key)) {
    console.log("Already signed");
    return;
  }

  const message = "Sign to play Web3 Flappy";
  const signature = await signer.signMessage(message);

  localStorage.setItem(key, signature);
  console.log("Signed once:", signature);
}
