const { Connection, Keypair, LAMPORTS_PER_SOL} = require('@solana/web3.js');

// Connect to the Devnet cluster
const connection = new Connection("http://127.0.0.1:8899", 'confirmed');

// Generate a new Keypair
const keypair = Keypair.generate();

// Log the public key
console.log('Newly generated Public Key:', keypair.publicKey.toString());

// Function to check wallet balance
async function getBalance() {
    const balance = await connection.getBalance(keypair.publicKey);
    console.log(`Wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);
}

// Function to airdrop SOL
async function airdropSOL() {
    console.log('Airdropping some SOL to my wallet');
    const signature = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature);

    console.log('wallet balance as', (await connection.getBalance(keypair.publicKey)) / LAMPORTS_PER_SOL, 'SOL');
}

// Run the functions
async function run() {
    await getBalance();
    await airdropSOL();
}

run();
















































// const { Connection, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, PublicKey } = solanaWeb3;

// // Establish connection to the local Solana test validator
// const connection = new Connection("http://127.0.0.1:8899", "confirmed");

// let newAccount = null;
// let phantomPublicKey = null;

// // Function to create a new Solana account and airdrop 2 SOL locally
// async function createAccount() {
//     try {
//         newAccount = Keypair.generate();
//         console.log(`New Account Created: \nPublic Key: ${newAccount.publicKey.toBase58()}`);

//         // Airdrop SOL to the new account in the local test network
//         const airdropSignature = await connection.requestAirdrop(
//             newAccount.publicKey,
//             2 * LAMPORTS_PER_SOL
//         );

//         // Confirm the airdrop transaction
//         await confirmTransaction(airdropSignature);

//         console.log("\n2 SOL airdropped to the new account!");
//         return newAccount.publicKey.toBase58();
//     } catch (error) {
//         console.error(`Error creating account: ${error.message}`);
//         throw error;
//     }
// }

// // Function to connect to Phantom Wallet
// async function connectWallet() {
//     try {
//         if (!window.solana || !window.solana.isPhantom) {
//             throw new Error("Phantom Wallet not found. Please install it.");
//         }

//         // Connect to the wallet
//         const response = await window.solana.connect();
//         phantomPublicKey = new PublicKey(response.publicKey);
//         console.log(`Connected to Phantom Wallet:\nPublic Key: ${phantomPublicKey.toBase58()}`);
//         return phantomPublicKey.toBase58();
//     } catch (error) {
//         console.error(`Error connecting wallet: ${error.message}`);
//         throw error;
//     }
// }

// // Function to transfer 1 SOL to Phantom Wallet
// async function transferSol() {
//     try {
//         if (!newAccount) {
//             throw new Error("New account is not created. Please create an account first.");
//         }
//         if (!phantomPublicKey) {
//             throw new Error("Phantom Wallet is not connected. Please connect it first.");
//         }

//         // Modify the transaction signing to work in browser environment
//         const transaction = new Transaction().add(
//             SystemProgram.transfer({
//                 fromPubkey: newAccount.publicKey,
//                 toPubkey: phantomPublicKey,
//                 lamports: 1 * LAMPORTS_PER_SOL,
//             })
//         );

//         // Get the latest blockhash
//         const { blockhash } = await connection.getLatestBlockhash();

//         // Set the blockhash and last valid block height
//         transaction.recentBlockhash = blockhash;
//         transaction.feePayer = newAccount.publicKey;

//         // Sign the transaction
//         const signedTransaction = await transaction.sign(newAccount);

//         // Send the transaction
//         const signature = await connection.sendRawTransaction(signedTransaction.serialize());

//         // Confirm the transaction
//         await confirmTransaction(signature);

//         console.log(`1 SOL transferred to Phantom Wallet.\nTransaction Signature: ${signature}`);
//         return signature;
//     } catch (error) {
//         console.error(`Error transferring SOL: ${error.message}`);
//         throw error;
//     }
// }
// // Function to confirm transaction
// async function confirmTransaction(signature) {
//     try {
//         const latestBlockhash = await connection.getLatestBlockhash();
//         await connection.confirmTransaction(
//             {
//                 signature,
//                 blockhash: latestBlockhash.blockhash,
//                 lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
//             },
//             "confirmed"
//         );
//         console.log("Transaction confirmed!");
//     } catch (error) {
//         console.error(`Error confirming transaction: ${error.message}`);
//         throw error;
//     }
// }

// // Event listeners for buttons
// document.getElementById("create-account").addEventListener("click", async () => {
//     try {
//         const publicKey = await createAccount();
//         document.getElementById("output").textContent = `New Account Created: \nPublic Key: ${publicKey}`;
//     } catch (error) {
//         document.getElementById("output").textContent = `Error: ${error.message}`;
//     }
// });

// document.getElementById("connect-wallet").addEventListener("click", async () => {
//     try {
//         const publicKey = await connectWallet();
//         document.getElementById("output").textContent = `Connected to Phantom Wallet:\nPublic Key: ${publicKey}`;
//     } catch (error) {
//         document.getElementById("output").textContent = `Error: ${error.message}`;
//     }
// });

// document.getElementById("transfer-sol").addEventListener("click", async () => {
//     try {
//         const signature = await transferSol();
//         document.getElementById("output").textContent += `\nTransaction Successful!\nSignature: ${signature}`;
//     } catch (error) {
//         document.getElementById("output").textContent = `Error: ${error.message}`;
//     }
// });