function normalizeAddress(address) {
    // Check if the address is a valid Ethereum address
    if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
        throw new Error('Invalid Ethereum address');
    }

    // Convert the address to lowercase
    return address.toLowerCase();
}
        
        document.getElementById("goBackButton").addEventListener("click", function() {
            window.location.href = "index.html";
        });

        document.getElementById("connectWalletButton").addEventListener("click", async function() {
            if (typeof ethereum !== 'undefined') {
                try {
                    // Request permission to connect to MetaMask
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                    const userAddress = normalizeAddress(accounts[0]);

                    // Initialize Firebase with your configuration
                    const firebaseConfig = {
            apiKey: "AIzaSyAeKo2LsvFJvz_5cFYBwJQWqGGDrd73zaA",
            authDomain: "ncf-auth.firebaseapp.com",
            databaseURL: "https://ncf-auth-default-rtdb.firebaseio.com",
            projectId: "ncf-auth",
            storageBucket: "ncf-auth.appspot.com",
            messagingSenderId: "507271869782",
            appId: "1:507271869782:web:995e3299d0924b3d18d2f7",
            measurementId: "G-LG3149FZHG"
        };


                    const firebaseApp = firebase.initializeApp(firebaseConfig);
                    const database = firebaseApp.database();
                    const ref = database.ref('Proprietor/' + userAddress); // Adjust the path to match your Firebase structure
                    console.log(userAddress);
                    ref.once('value', function(snapshot) {
                        if (snapshot.exists()) {
                            alert('Success: Address exists in the database.');
                        } else {
                            alert('Failure: Address does not exist in the database.');
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            } else {
                alert('Please install MetaMask to use this feature.');
            }
        });