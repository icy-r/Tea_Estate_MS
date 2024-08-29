import {Button} from "@mui/material";


const Header = () => {

    const showAlert = () => {
        alert("Hello World");
    }

    return (
        <div>

            <div className="font-bold text-2xl">
                <Button variant="contained" onClick={showAlert}>
                    Primary
                </Button>
                this is header
            </div>
        </div>
    )
}

export default Header;