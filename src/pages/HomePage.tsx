import Navbar from '../components/Navbar'

const HomePage = () => {
    return (
        <>
            <Navbar showTasks={true} />
            
            <div className=' w-full h-full min-h-screen m-0 flex justify-center items-center'>
                <div className=' w-4/5 flex justify-center items-center gap-10 flex-col'>
                    <h1 className=' text-[5rem] font-bold'>Welcome to <span className=' text-orange-500'>TASKY!</span></h1>
                    <p className=' text-2xl font-medium text-center'>A highly functional Tasks tracking app, that lets user nest multiple tasks within other tasks. Keep track of all your tasks at one place. Group similar tasks together and create multiple groups if necessary!</p>
                </div>
            </div>
        </>
    )
}

export default HomePage
