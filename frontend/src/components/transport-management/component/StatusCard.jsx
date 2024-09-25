import { motion } from "framer-motion";

const StatusCard = (props) => {
    const { data } = props ? props : null;

    return (
        <div className='flex justify-evenly items-center w-full gap-6'>
            {
                data ? data.map((item, index) => {
                    // Conditionally set the border color based on the count value
                    const borderColor = item.count < 5 ? 'border-red-500' : 'border-transparent'; // Use transparent for the second color

                    return (
                        <motion.div
                            key={index}
                            className={`flex flex-col gap-2 px-5 h-32 w-48 bg-white_modified rounded-sm py-3 border-b-8 ${borderColor}`}
                            style={{ borderBottomColor: item.count < 5 ? 'rgba(255, 0, 0, 1)' : '#15F5BA' }} // Set the border color directly
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-xl text-black">{item.title}</div>
                            <div className="text-lg font-semibold text-black">{item.count}</div>
                        </motion.div>
                    );
                }) : null
            }
        </div>
    );
}

export default StatusCard;
