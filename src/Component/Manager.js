import React, { useState, useContext, useEffect } from 'react'
import { AppState } from '../App'
import { ethers } from 'ethers';
const Manager = () => {
    const App = useContext(AppState);
    const [Address, setAddress] = useState();
    const [target, settarget] = useState();
    const [Description, setDescription] = useState();
    const [Balance, setBalance] = useState('');
    useEffect(() => {
        const getBal = async () => {
            try {
                const Balance = await App.Charitycontract.getContractBalance()
                setBalance(Balance);
            } catch (error) {
                console.log(error);
            }
        };
        getBal();
    }, []);
    const Create = async () => {
        try {

            const tx = await App.Charitycontract.createRequests(Description, Address, ethers.utils.parseEther(target));
            await tx.wait();
            alert("Created Sucessfull!")
            setAddress('')
            settarget('')
            setDescription('')
        } catch (error) {
            if (error.message === "MetaMask Tx Signature: User denied transaction signature.") {
                alert(" User denied transaction signature.")
            } else if (error.message === "execution reverted: Only manager can calll this function") {
                alert(" Only manager can calll this function")
            }
            else {
                console.log(error.message)
                alert("Something went wrong")
            }
        }
    };
    return (
        <div>
            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-10 mx-auto">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-0 text-gray-900">Contract Balance -: {(Balance.toString()) / 10 ** 18} ETH</h1>
                    </div>
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Create Request</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-xl bg-gray-600 text-blue-100">Recipient Address</label>
                                    <input value={Address} onChange={(e) => setAddress(e.target.value)} type="text" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-xl  bg-gray-600 text-blue-100">Taget in ETH</label>
                                    <input value={target} onChange={(e) => settarget(e.target.value)} type="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-xl bg-gray-600 text-blue-100">Description</label>
                                    <textarea value={Description} onChange={(e) => setDescription(e.target.value)} id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button onClick={() => Create()} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Manager