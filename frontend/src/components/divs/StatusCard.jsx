const StatusCard = (props) => {
    const { data } = props? props: null;

    return (
        <div className='flex justify-evenly items-center w-full gap-6'>
            {
                data? data.map((data, index) => (
                    <div key={index} className={`flex flex-col gap-2 px-5 bg-white_modified rounded-sm py-3 border-b-8 border-color_button`}>
                        <div className="text-sm text-black text-center">{data.title}</div>
                        <div className="text-lg font-semibold text-black">{data.count}</div>
                    </div>
                )): null
            }
        </div>
    );
}

export default StatusCard;