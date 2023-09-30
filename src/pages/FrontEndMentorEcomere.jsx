import React, { useState, useReducer,useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import OpenImage from "../components/OpenImage";
import Icons from "../components/Icons.js"
import swal from "sweetalert";


// Inisialisasi state awal
const initialState = {
  harga: 125.0,
  jumlah: 0,
  name: "Fall Limited Edition Sneakers",
  cart: [],
  // image : "images/image-product-1.jpg",
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      if (state.jumlah < 1) {
        return { harga: 125.0, jumlah: 1, name: state.name };
      } else {
        return {
          ...state,
          jumlah: state.jumlah + 1,
          harga: state.harga + 125.0,
        };
      }
      
    case "decrement":
      if (state.jumlah > 1) {
        return {
          ...state,
          jumlah: state.jumlah - 1,
          harga: state.harga - 125.0,
        };
      } else if (state.jumlah === 1) {
        return { harga: 125.0, jumlah: 0, name: state.name };
      } else if (state.jumlah === 0) {
        return { harga: 125.0, jumlah: 0, name: state.name };
      }
      break;
    case "addToCart":
      const newItem = {
        name: state.name,
        harga: state.harga,
        jumlah: state.jumlah,
      };
      console.log(newItem);
      return { ...state, cart: [newItem] };
      
    case "delete":
      return { ...state, cart: [], harga: 125.0, jumlah: 0 };
    default:
      return state;
  }
}

export default function FrontEndMentorEcomere() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [active, setAcrtive] = useState(0);
  const [open, setOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [total, setTotal] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleSubmit = (e) => {
    if (state.jumlah >= 1) {
      e.preventDefault();
      dispatch({ type: "addToCart" });
      swal({
        icon: "success",
        title: "Berhasil ditambahkan",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "bg-Orange",
            closeModal: true,
          },
        },
      });
      
    } else {
    }

    setCartAnimation(true);
    setTimeout(() => {
      setCartAnimation(false);
    }, 700);
  };

  
  function deleteAll() {
    dispatch({ type: "delete" });
  }
  const cancelClose = (e) => {
    e.stopPropagation();
  };

  function toggleNavbar() {
    setOpen(!open);
  }

  function openNavbar() {
    setOpenNav(!openNav);
  }

  const CustomPrevArrow = (props) => (
    <button
      className={`absolute top-[12rem] z-10 left-6 bg-white py-[0.8rem] px-4  rounded-3xl border hover:border-Orange lg:hidden`}
      onClick={(e) => {
        props.onClick(e);
      }}
    >
      <img src={Icons.previous} alt="prev" className="hover-filter" />
    </button>
  );

  const CustomNextArrow = (props) => (
    <button
      className={`absolute top-[12rem] z-10 right-6 bg-white py-[0.8rem] px-4  rounded-3xl border hover:border-Orange lg:hidden`}
      onClick={(e) => {
        props.onClick(e);
      }}
    >
      <img src={Icons.next} alt="next" className="hover-filter " />
    </button>
  );

  const settings = {
    appendDots: (dots) => (
      <div>
        <ul
          className={`${open ? "hidden" : "gap-[90px] -ms-1 lg:flex hidden"}`}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: function (i) {
      return (
        <div
          className={`w-[80px] mt-5 rounded-lg ${
            i === active ? "border-2 border-Orange opacity-60 " : ""
          }`}
        >
          <img
            src={require(`../assets/images/image-product-${i + 1}-thumbnail.jpg`)}
            className={`rounded-md`}
            alt="paging"
          />
        </div>
      );
    },
    dots: true,
    // dotsClass: "slick-dots slick-thumb",
    beforeChange: (current, next) => setAcrtive(next),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="ecomerce lg:w-[80%] mx-auto">
      {/* desktop navbar*/}
      <nav className="lg:flex justify-between items-center border-b hidden">
        <ul className="lg:flex gap-5 items-center cursor-pointer hidden">
          <h1 className="font-bold text-4xl hover:animate-bounce">sneakers</h1>
          <a href="https://justnitha.github.io/Front-Ecomerce/">
            <li className=" hover:border-b-2 hover:border-Orange py-6">
              Collections
            </li>
          </a>
          <a href="https://justnitha.github.io/Front-Ecomerce/">
            <li className="border-b-2  border-Orange py-6">Men</li>
          </a>
          <a href="https://justnitha.github.io/Front-Ecomerce/">
            <li className=" hover:border-b-2 hover:border-Orange py-6">
              Women
            </li>
          </a>
          <a href="https://justnitha.github.io/Front-Ecomerce/">
            <li className=" hover:border-b-2 hover:border-Orange py-6">
              About
            </li>
          </a>
          <a href="https://justnitha.github.io/Front-Ecomerce/">
            <li className=" hover:border-b-2 hover:border-Orange py-6">
              Contact
            </li>
          </a>
        </ul>
        <div className="flex gap-4 items">
          <button
            onClick={() => setTotal(!total)}
            className={`cart-icon hover:animate-bounce ${cartAnimation ? "animate-cart" : ""}`}
          >
            <img
              src={Icons.cart}
              alt="cart"
              className="hover-filter"
            />
            {/* <div className="tooltip">Teks Pesan Sukses</div> */}
          </button>
          <img
            src={require('../assets/images/image-avatar.png')}
            alt="avatar"
            className="w-10 hover:border hover:border-Orange rounded-3xl cursor-pointer"
          />
        </div>
      </nav>

      {/* mobile navbar */}
      <nav className="flex justify-between items-center py-2 lg:hidden px-6 bg-white">
        <div className="flex items-center gap-3">
          <img
            src={Icons.menu}
            alt="menu"
            className="mt-2 cursor-pointer hover-filter"
            onClick={openNavbar}
          />
          <h1 className="font-bold text-4xl">sneakers</h1>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setTotal(!total)}
            className={`cart-icon ${cartAnimation ? "animate-cart" : ""}`}
          >
            <img
              src={Icons.cart}
              alt="cart"
              className="hover-filter"
            />
          </button>
          <img
            src={require('../assets/images/image-avatar.png')}
            alt="avatar"
            className="w-8 hover:border hover:border-Orange rounded-3xl cursor-pointer"
          />
        </div>
      </nav>
      
      {/* {openNav  ? ( */}
        <div>
          <div 
            className={`${openNav? 'bg-black fixed top-0 w-full h-full lg:z-10 z-20  opacity-40':''}`}
            onClick={openNavbar}
          ></div>
          <div className={` ${openNav ? 'nav buka' : 'navt tutup'}`}>
          {openNav ? (<div>
            <img
              src={Icons.close}
              alt="close"
              onClick={openNavbar}
              className="mt-10 hover-filter cursor-pointer"
            />
            <ul className="cursor-pointer mt-10 ">
              <a href="https://justnitha.github.io/Front-Ecomerce/">
                <li className="mt-3 font-bold text-lg hover:text-Orange">Collections</li>
              </a>
              <a href="https://justnitha.github.io/Front-Ecomerce/">
                <li className="mt-3 font-bold text-lg hover:text-Orange">Men</li>
              </a>
              <a href="https://justnitha.github.io/Front-Ecomerce/">
                <li className="mt-3 font-bold text-lg hover:text-Orange">Women</li>
              </a>
              <a href="https://justnitha.github.io/Front-Ecomerce/">
                <li className="mt-3 font-bold text-lg hover:text-Orange">About</li>
              </a>
              <a href="https://justnitha.github.io/Front-Ecomerce/">
                <li className="mt-3 font-bold text-lg hover:text-Orange">Contact</li>
              </a>
            </ul>
          </div>) : (<div></div>)}
            
          </div>
        </div>
     
      {/* foto */}
      <div className="lg:flex lg:mt-16 items-center pb-5 lg:pb-0">
        <div className="lg:w-[50%] cursor-pointer">
          {/* mobile */}
          <div className="lg:hidden">
            <Slider {...settings} className="mx-auto cursor-auto ">
              <img src={require('../assets/images/image-product-1.jpg')} alt="gambar 1" />
              <img src={require('../assets/images/image-product-2.jpg')} alt="gambar 2" />
              <img src={require('../assets/images/image-product-3.jpg')} alt="gambar 3" />
              <img src={require('../assets/images/image-product-4.jpg')} alt="gambar 4" />
            </Slider>
          </div>
          {/* desktop */}
          <div className="hidden lg:block">
            <Slider {...settings} className="lg:w-[80%] mx-auto ">
              <img
                src={require('../assets/images/image-product-1.jpg')}
                alt="gambar 1"
                className="lg:rounded-xl"
                onClick={toggleNavbar}
              />
              <img
                src={require('../assets/images/image-product-2.jpg')}
                alt="gambar 2"
                className="lg:rounded-xl"
                onClick={toggleNavbar}
              />
              <img
                src={require('../assets/images/image-product-3.jpg')}
                alt="gambar 3"
                className="lg:rounded-xl"
                onClick={toggleNavbar}
              />
              <img
                src={require('../assets/images/image-product-4.jpg')}
                alt="gambar 4"
                className="lg:rounded-xl"
                onClick={toggleNavbar}
              />
            </Slider>
          </div>
        </div>
        <div className="lg:w-[50%] mt-20">
          <div className="lg:w-[80%] mx-auto px-6 lg:px-0">
            <h3 className="uppercase text-Orange font-bold tracking-wider">
              sneakers company
            </h3>
            <h1 className="font-bold text-5xl pt-4">
              Fall Limited Edition Sneakers
            </h1>
            <p className="text-Dark-GrayishBlue font-normal py-7">
              These low-profile sneakers are you perfect casual wear companion.
              Featuring a durable rubber outer sole, they'll wishstand
              everything the weather can offer.
            </p>
            <p className="font-bold text-3xl flex items-center gap-5">
              ${state.harga.toFixed(2)}
              <p className="text-xs text-Orange px-2 py-1 bg-Orange-pale">
                50%
              </p>
            </p>
            <div className="relative w-16 text-Dark-GrayishBlue">
              <div className="absolute border-[0.5px] border-Dark-GrayishBlue w-full top-3"></div>
              <p>$250.00</p>
            </div>
            <div className="lg:flex gap-5 mt-7">
              <div className="grid grid-cols-3 bg-Light-GrayishBlue py-2 rounded-lg lg:w-[36%] text-center ">
                <button
                  className="w-full"
                  onClick={() => dispatch({ type: "decrement" })}
                >
                  <img src={Icons.minus} alt="minus" className="mx-auto" />
                </button>
                <div className="font-bold w-full">{state.jumlah}</div>
                <button
                  className="w-full mx-auto"
                  onClick={() => dispatch({ type: "increment" })}
                >
                  <img src={Icons.plus} alt="plus" className="mx-auto" />
                </button>
              </div>
              <div
                className="lg:w-[64%] py-2 mt-3 lg:mt-0 font-bold flex justify-center gap-4 bg-Orange hover:bg-orange-400 text-white rounded-lg items-center cursor-pointer"
                onClick={handleSubmit}
              >
                <img
                  src={Icons.cart}
                  alt="cart"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <p>Add to cart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tombol cart */}
      {total ? (
        <div className="px-[21px] lg:px-0">
          <div
            className="fixed top-0 left-0 w-[100%] h-full lg:z-10 z-20"
            onClick={() => setTotal(!total)}
          ></div>
          <div className="bg-white shadow-xl lg:w-[20%] w-[90%] rounded-xl z-20 lg:z-10 absolute top-20 lg:top-16 lg:right-20 h-[44%]  lg:h-[20%] px-4 py-4">
            <h3 className="font-bold pb-3 border-b">Cart</h3>
            {state.cart.length === 0 ? (
              <p className=" mt-8 text-center"> Your cart is empty</p>
            ) : (
              <div className="relative">
                {state.cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-5 lg:gap-0 mt-5 btmn"
                  >
                    <img
                      src={require('../assets/images/image-product-1.jpg')}
                      alt="p 1"
                      className="lg:w-10 w-20 lg:h-10 h-20 rounded-md"
                    />
                    <div>
                      <h1 className="lg:text-[13px] text-base">{item.name}</h1>
                      <div className="lg:text-[14px] text-base">
                        <p>
                          $125.00 x {state.jumlah}{" "}
                          <span className="font-bold">
                            ${state.harga.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button onClick={deleteAll}>
                      <img
                        src={Icons.delete}
                        alt="delete"
                        className="hover-filter"
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className={`grid grid-cols-3 bg-Light-GrayishBlue py-2 rounded-lg lg:hidden w-full text-center  ${state.cart.length === 0 ? 'hidden' : ''}`}>
                  <button
                    className="w-full"
                    onClick={() => dispatch({ type: "decrement" })}
                  >
                    <img src={Icons.minus} alt="minus" className="mx-auto" />
                  </button>
                  <div className="font-bold w-full">{state.jumlah}</div>
                  <button
                    className="w-full mx-auto"
                    onClick={() => dispatch({ type: "increment" })}
                  >
                    <img src={Icons.plus} alt="plus" className="mx-auto" />
                  </button>
                </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {/*foto open  */}
      {open ? (
        <div onClick={toggleNavbar}>
          <div className="bg-black absolute w-full left-0 h-[110%] top-0 opacity-70"></div>
          <div className=" w-[80%] absolute text-center mx-auto top-20">
            <OpenImage toggleNavbar={toggleNavbar} cancelClose={cancelClose} />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
