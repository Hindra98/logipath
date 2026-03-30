import "../../styles/_spinner.css";

const UILoader = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const UISpinner = () => {
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-0 flex justify-center items-center z-10">
      <div className="size-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export const UISpinner2 = () => {
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-0 flex justify-center items-center z-10">
      <div className="chargementFx"></div>
    </div>
  );
};

export default UILoader;
