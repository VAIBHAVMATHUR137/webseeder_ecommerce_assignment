export const Navbar = () => {
    return (
      <div className="flex justify-between items-center h-full flex-wrap ">
        <div className="mx-5 cursor-pointer">Home</div>
        <div className="flex items-center gap-12 mx-5 ">
          <span className="cursor-pointer">Wishlist</span>
          <span className="cursor-pointer">Cart</span>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  