import React, { useState, useContext } from 'react'
import { AppState } from '../App'
import { ethers } from 'ethers';
const Contributors = () => {
    const App = useContext(AppState);
    const [Amount, setAmount] = useState();

    const Contribut = async () => {
        try {
            const tx = await App.Charitycontract.sendEth({ value: ethers.utils.parseEther(Amount) });
            await tx.wait();
            alert("Donated Sucessfull!")
            setAmount('')
        } catch (error) {
            if (error.message === "MetaMask Tx Signature: User denied transaction signature.") {
                alert(" User denied transaction signature.")
            }
            else {
                console.log(error.message)
                alert("Something went wrong")
            }
        }
    };
    return (
        <div>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Every small act of kindness has the potentail to make a big difference</h1>
                        <h3>
                            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                                Join usin spreading compassion and changing lives through our charity app.
                            </p>
                        </h3>
                    </div>
                    <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                        <div class="relative flex-grow w-full">
                            <label for="full-name" class=" leading-7 text-sm text-white bg-gray-700 m-72">Amount in ETH</label>
                            <input value={Amount} onChange={(e) => setAmount(e.target.value)} type="text" id="full-name" name="full-name" class="w-full  bg-gray-700 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2 focus:ring-yellow-200 focus:bg-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out 
                            " />

                        </div>
                        <button onClick={() => Contribut()} class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">Submit</button>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Contributors