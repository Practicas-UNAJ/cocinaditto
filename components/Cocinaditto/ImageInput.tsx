export const ImageInput = ({children}: any) => {
  return (
    <div className="relative group object-cover w-full">
      {children}
      <div className="absolute top-0 left-0 grid items-center justify-center w-full h-full">
        <input type="file" className="absolute w-full h-full opacity-0" />
      </div>
    </div>
  );
};
