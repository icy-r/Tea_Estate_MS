const Status = ({value}) => {
    return (
        <div
            className={`flex max-h-fit justify-center items-center ${value === "active" ? "bg-color_extra" : "bg-yellow-500"} p-1 text-nowrap rounded-2xl`}
        >
            <div className={`${value === "active" ? "bg-color_button" : "bg-yellow-700"} rounded-full px-2`}>
                P
            </div>
            <div className={`rounded-2xl px-2`}>
                {value}
            </div>
        </div>
    );
}

export default Status;