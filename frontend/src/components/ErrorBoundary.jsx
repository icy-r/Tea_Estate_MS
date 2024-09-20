import React from "react";

class ErrorBoundary extends React.Component {
    //variable to store the error

    constructor(props) {
        super(props);
        this.state = { hasError: false, problem: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, problem: error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='flex flex-col items-center min-h-12 justify-center'>
                    <h1 className='text-3xl text-red-500'>You&apos;re an idiot</h1>
                    <p className='text-xl text-red-500'>Please refresh the page or try again later.</p>
                    <p className='text-xl text-red-500'>Error: {this.state.problem.message}</p>
                </div>
            )
        }

        // eslint-disable-next-line react/prop-types
        return this.props.children;
    }
}


export default ErrorBoundary;