const Status = ({value}) => {
    return (
        <div
            className={`flex max-h-fit justify-center items-center ${value === "Active" ? "bg-[#6DFFD9]" : "bg-yellow-500"} p-1 text-nowrap rounded-2xl`}
        >
            <div
                className={`${value === "Active" ? "bg-[#15F5BA]" : "bg-yellow-700"} rounded-full px-2 text-red-400`}>
                P
            </div>
            <div className={`rounded-2xl px-2 text-black`}>
                {value}
            </div>
        </div>
    );
}

export default Status;