import React from 'react';
import Header from '../navbar/Header';


const AddSupply = () => {
    
    return(

        <div className="flex-1 p-10 text-gray-700">
          <header className="flex justify-between place-items-center">
            <h2 className='text-xl font-semibold'>Add Supply</h2>
           </header>
            

            {/*form white background*/}
            <div className='mt-8 bg-white shadow-md rounded-lg p-8'>

                {/*form*/}
                <form className='grid-cols-2 gap-4'>
                    
                    {/*Supply ID*/}
                    <div className="flex flex-col">
                        <label className="text-gray-600">Supply ID</label>
                            <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>

                    {/*Supply Type*/}
                    <div className="flex flex-col">
                        <label className="text-gray-600">Supply Type</label>
                            <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>

                    {/*Supply Name*/}
                    <div className="flex flex-col">
                        <label className="text-gray-600">Supply Name</label>
                            <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>

                    {/*Supplier Name*/}
                    <div className="flex flex-col">
                        <label className="text-gray-600">Supplier Name</label>
                            <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>

                    <div>
                        
                    </div>

                    <div>
                        {/*submit button*/}
                        <button className='mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600'>Submit</button>
                        {/*cancel button*/}
                        <button className='ml-4 bg-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-400'>Cancel</button>
                    </div>


                </form>

            </div>
        </div>
    )

}

export default AddSupply;