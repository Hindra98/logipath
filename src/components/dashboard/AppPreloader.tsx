import UILoader from "../ui/UILoader";

export default function AppPreloader () {

    return(
        <div className="flex flex-col justify-center w-full">
            <div className="flex flex-col gap-6 justify-center min-h-[490px]">
            <div className="logo mx-auto py-4">
            <img
                src={`logo_blue.png`}
                alt="Logipath Logo"
                title=""
                className="p-4"
            />
            </div>
            <div className="child flex justify-center items-center">
                <UILoader/>
            </div>
          </div>
        </div>
    );
};