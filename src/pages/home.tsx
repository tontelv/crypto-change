import React, { useState, useEffect } from "react";
import Button from "../components/button";
import Select from "../components/select";
import Balance from "../components/balance";
import Input from "../components/input";

import SwapImage from "../assets/swap.png";

const Home = () => {
  type Currency = "USD" | "GBP" | "EUR";

  const currecies: Array<Currency> = ["USD", "GBP", "EUR"];

  const [fromTokenCurrency, setFromTokenCurrency] = useState<Currency>("USD");
  const [toTokenCurrency, setToTokenCurrency] = useState<Currency>("GBP");

  const [USDRate, setUSDRate] = useState<number>(0);
  const [GBPRate, setGBPRate] = useState<number>(0);
  const [EURRate, setEURRate] = useState<number>(0);
  const [isRateLoading, setIsRateLoading] = useState<boolean>(true);

  const [USDAmount, setUSDAmount] = useState<number>(200);
  const [GBPAmount, setGBPAmount] = useState<number>(150);
  const [EURAmount, setEURAmount] = useState<number>(10);

  const [fromTokenInputAmount, setFromTokenInputAmount] = useState<string>("");
  const [toTokenInputAmount, setToTokenInputAmount] = useState<string>("");

  const [errorText, setErrorText] = useState<string>("Please input amount");
  const [isError, setIsError] = useState<boolean>(true);

  const initInputAmount = () => {
    setFromTokenInputAmount("");
    setToTokenInputAmount("");
  };

  const getAmount = (currency: Currency): number => {
    let amount: number = 0;
    switch (currency) {
      case "USD":
        amount = USDAmount;
        break;
      case "GBP":
        amount = GBPAmount;
        break;
      case "EUR":
        amount = EURAmount;
        break;
      default:
        break;
    }
    return amount;
  };

  const getSymbol = (currency: Currency): string => {
    let symbol: string = "";
    switch (currency) {
      case "USD":
        symbol = "$";
        break;
      case "GBP":
        symbol = "£";
        break;
      case "EUR":
        symbol = "€";
        break;
      default:
        break;
    }
    return symbol;
  };

  const swapExchangeDirection = () => {
    let tempFromTokenCurrency: Currency;
    tempFromTokenCurrency = fromTokenCurrency;
    setFromTokenCurrency(toTokenCurrency);
    setToTokenCurrency(tempFromTokenCurrency);
  };

  const exchange = () => {
    switch (fromTokenCurrency) {
      case "USD":
        setUSDAmount(USDAmount - parseFloat(fromTokenInputAmount));
        break;
      case "GBP":
        setGBPAmount(GBPAmount - parseFloat(fromTokenInputAmount));
        break;
      case "EUR":
        setEURAmount(EURAmount - parseFloat(fromTokenInputAmount));
        break;
      default:
        break;
    }

    switch (toTokenCurrency) {
      case "USD":
        setUSDAmount(USDAmount + parseFloat(toTokenInputAmount));
        break;
      case "GBP":
        setGBPAmount(GBPAmount + parseFloat(toTokenInputAmount));
        break;
      case "EUR":
        setEURAmount(EURAmount + parseFloat(toTokenInputAmount));
        break;
      default:
        break;
    }

    initInputAmount();
  };

  const getPrice = (currency: Currency): number => {
    let price: number = 0;
    switch (currency) {
      case "USD":
        price = USDRate;
        break;
      case "GBP":
        price = GBPRate;
        break;
      case "EUR":
        price = EURRate;
        break;
      default:
        break;
    }
    return price;
  };

  const getRateAPI = () => {
    const baseURL = "http://api.exchangeratesapi.io/v1";
    const access_key = "abb5fdb23385e71da70b2b4cd71fd914";

    return new Promise((resolve, reject) => {
      fetch(`${baseURL}/latest?access_key=${access_key}`)
        .then(res => res.json())
        .then(result => {
          return resolve(result);
        })
        .catch(error => {
          return reject(error);
        });
    });
  };

  const getRatio = (): number => {
    let ratio: number = 0;
    ratio = getPrice(toTokenCurrency) / getPrice(fromTokenCurrency);
    return ratio;
  };

  const formatNumber = (inputNumber: number): string => {
    let tempNumber: string;
    tempNumber = (Math.round(inputNumber * 10000) / 10000).toFixed(4);
    return tempNumber;
  };

  const getSwapError = () => {
    if (fromTokenInputAmount === "" || parseFloat(fromTokenInputAmount) === 0) {
      setErrorText("Please input amount");
      setIsError(true);
    } else {
      if (parseFloat(fromTokenInputAmount) > getAmount(fromTokenCurrency)) {
        setErrorText("Insufficient amount");
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  };

  useEffect(() => {
    getSwapError();
  }, [fromTokenInputAmount, toTokenInputAmount]);

  useEffect(() => {
    initInputAmount();
  }, [fromTokenCurrency, toTokenCurrency]);

  useEffect(() => {
    getRateAPI()
      .then((result: any) => {
        setIsRateLoading(false);
        if (result.success) {
          setUSDRate(result.rates.USD);
          setGBPRate(result.rates.GBP);
          setEURRate(1);
        }
      })
      .catch(error => {});
  }, []);

  return (
    <div className="page-home">
      <div className="page-home__swap-part">
        {/* swap header */}
        <div className="page-home__swap-part__header">
          Crypto Currency Exchange
        </div>

        {/* swap body */}
        <div className="page-home__swap-part__body">
          <div className="page-home__swap-part__body__swap-direction">
            <div className="page-home__swap-part__body__swap-direction__container">
              <div className="page-home__swap-part__body__swap-direction__container__ratio">
                {`1${getSymbol(fromTokenCurrency)} = ${formatNumber(
                  getRatio()
                )}${getSymbol(toTokenCurrency)}`}
              </div>
              <div
                className="page-home__swap-part__body__swap-direction__container__button"
                onClick={evt => {
                  evt.preventDefault();
                  swapExchangeDirection();
                }}
              >
                <img src={SwapImage} width={20} height={20} alt="swap" />
              </div>
            </div>
          </div>
          <div className="page-home__swap-part__body__from">
            <div className="page-home__swap-part__body__from__left">
              <Select
                items={currecies}
                otherItem={toTokenCurrency}
                selectedItem={fromTokenCurrency}
                selectItem={setFromTokenCurrency}
              />
              <Balance>
                {getAmount(fromTokenCurrency)}
                {getSymbol(fromTokenCurrency)}
              </Balance>
            </div>
            <div className="page-home__swap-part__body__from__right">
              <Input
                isFrom={true}
                placeholder="0.0"
                value={fromTokenInputAmount}
                onChange={evt => {
                  const re = /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
                  if (evt.target.value === "" || re.test(evt.target.value)) {
                    setFromTokenInputAmount(evt.target.value);
                    if (evt.target.value === "") {
                      setToTokenInputAmount("");
                    } else {
                      const _toTokenInputAmount =
                        parseFloat(evt.target.value) * getRatio();
                      setToTokenInputAmount(formatNumber(_toTokenInputAmount));
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="page-home__swap-part__body__to">
            <div className="page-home__swap-part__body__to__left">
              <Select
                items={currecies}
                otherItem={fromTokenCurrency}
                selectedItem={toTokenCurrency}
                selectItem={setToTokenCurrency}
              />
              <Balance>
                {getAmount(toTokenCurrency)}
                {getSymbol(toTokenCurrency)}
              </Balance>
            </div>
            <div className="page-home__swap-part__body__to__right">
              <Input
                isFrom={false}
                placeholder="0.0"
                value={toTokenInputAmount}
                onChange={evt => {
                  const re = /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
                  if (evt.target.value === "" || re.test(evt.target.value)) {
                    getSwapError();
                    setToTokenInputAmount(evt.target.value);
                    if (evt.target.value === "") {
                      setFromTokenInputAmount("");
                    } else {
                      const _fromTokenInputAmount =
                        parseFloat(evt.target.value) / getRatio();
                      setFromTokenInputAmount(
                        formatNumber(_fromTokenInputAmount)
                      );
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* swap footer */}
        <div className="page-home__swap-part__footer">
          <Button
            disabled={isError || isRateLoading}
            onClick={evt => {
              evt.preventDefault();
              if (!isError) {
                exchange();
              }
            }}
          >
            {isRateLoading
              ? "Loading rates ..."
              : isError
              ? errorText
              : "Exchange"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
