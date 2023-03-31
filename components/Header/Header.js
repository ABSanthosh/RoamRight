import { useEffect, useState } from "react";
import "./Header.scss";
import Link from "next/link";

function Header() {
  const [navState, setNavState] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 1) {
  //       document.querySelector(".HeaderWrapper").style.height = "70px";
  //     } else {
  //       document.querySelector(".HeaderWrapper").style.height = "";
  //     }
  //   });

  //   return () => {
  //     window.removeEventListener("scroll", () => {});
  //   };
  // });

  return (
    <nav className="HeaderWrapper">
      <Link href="/" className="HeaderWrapper__logo">
        <span>Roam Right</span>
      </Link>
      <div
        className={`HeaderWrapper__Menu ${
          navState ? "HeaderWrapper__Menu--open" : ""
        }`}
      >
        <ul className="HeaderWrapper__MenuList--left">
          <li className="HeaderWrapper__MenuList--logo">
            <Link href="/">
              <span>Roam Right</span>
            </Link>
          </li>
        </ul>
        <ul className="HeaderWrapper__MenuList--center">
          {/* <li className="HeaderWrapper__MenuList--item">
            <a href="/#faq">FAQs</a>
          </li> */}
        </ul>
      </div>
      <div className="HeaderWrapper__Hamburger">
        <input
          type="checkbox"
          id="NavBarInput"
          onChange={() => {
            setNavState(!navState);
          }}
        />
        <div className="hamButton">
          <label className="HamMenu" htmlFor="NavBarInput">
            <span className="span HL1" />
            <span className="span HL2" />
            <span className="span HL3" />
          </label>
        </div>
      </div>
    </nav>
  );
}

export default Header;

// suppose there are 5 vendors
// 7, 5, 4 score
// then it will be 7x+5x+4x = entered_quantity
// scrore*x kg for each vendor/

// Vendor list remove
// manual vendor branch

// sort by total for each vendor
