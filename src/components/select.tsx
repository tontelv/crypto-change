import React, { useState, useEffect } from "react";
import DropDownImage from "../assets/dropdown.png";

type Currency = "USD" | "GBP" | "EUR";

interface ISelectProps {
  items: Array<Currency>;
  otherItem: Currency;
  selectedItem: Currency;
  selectItem: (item: Currency) => void;
}

const Select: React.FC<ISelectProps> = ({
  items,
  otherItem,
  selectedItem,
  selectItem
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpen = () => {
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className="component-select"
      onClick={() => {
        handleOpen();
      }}
      onMouseLeave={() => {
        handleClose();
      }}
    >
      <div className="component-select__selected">
        <div>{selectedItem}</div>
        <img src={DropDownImage} width={20} height={20} alt="dropdown" />
      </div>
      {isMenuOpen && (
        <div className="component-select__menu">
          {items.map(item => {
            return (
              <div
                className={
                  item === otherItem
                    ? "component-select__menu__item component-select__menu__item-disabled"
                    : "component-select__menu__item"
                }
                onClick={evt => {
                  evt.preventDefault();
                  if (item === otherItem) {
                  } else {
                    selectItem(item);
                    handleClose();
                  }
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
