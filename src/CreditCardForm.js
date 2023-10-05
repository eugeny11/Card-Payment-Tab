import React, { useState } from "react";
import Tooltip from "./Tooltip";
import Modal from "./Modal";
import "./CreditCardForm.css";

const CreditCardForm = ({ items, total }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); //Delete all symbols, except numbers
    const formattedValue = (value.match(/.{1,4}/g) || []).join(" "); //Group all symbols by four and turn back to string
    setCardNumber(formattedValue); //
  };

  const handleExpireDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9/]/g, "");

    // Making slash after secons symbol
    if (value.length === 2 && e.target.value.length !== 3) {
      value += "/";
    }

    // Max length of possible entered symbold
    if (value.length <= 5) {
      setExpireDate(value);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (String(cardNumber).replace(/\s+/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (cvv.length !== 3) {
      newErrors.cvv = "CVV must containt 3 numbers";
    }

    if (!cardHolder) {
      newErrors.cardHolder = "Card holder name is required";
    }

    const [month, year] = expireDate.split("/");

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Return two last digits of current year
    const currentMonth = currentDate.getMonth() + 1; // getMonth return months, starting from 0

    if (
      !month ||
      !year ||
      month > 12 ||
      month < 1 ||
      year.length !== 2 ||
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      newErrors.expireDate = "Expire date is not correct";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true, if we got no mistakes
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    //Here is simple example of code sending to server
    if (validate()) {
      setIsSubmitting(true);
      console.log("Send data to server");
      fetch("/endpoint", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({
          cardNumber,
          cvv,
          cardHolder,
          expireDate,
          items,
          total,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data successfully loaded:", data);
          setCardNumber("");
          setCvv("");
          setCardHolder("");
          setExpireDate("");
          setIsSubmitting(false);
        })
        .catch((error) => {
          console.log("Error", error);
          setCardNumber("");
          setCvv("");
          setCardHolder("");
          setExpireDate("");
          setIsSubmitting(false);
        });
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className="card-container">
      <form onSubmit={handleSumbit}>
        <div className="card-container-flex">
          <div className="left-column">
            <div className="input-group">
              <label>Number Of Credit Card</label>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19} //16 numbers and 3 spaces
              />
              {errors.cardNumber && (
                <small className="error">{errors.cardNumber}</small>
              )}
            </div>
            <div className="input-group">
              <label>Expiration date</label>
              <input
                type="text"
                value={expireDate}
                onChange={handleExpireDateChange}
                placeholder="MM/YY"
              />
              {errors.expireDate && (
                <small className="error">{errors.expireDate}</small>
              )}
            </div>
            <div className="input-group input-group--cardholder">
              <label>Card holder's name</label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Enter your full name"
              />
              {errors.cardHolder && (
                <small className="error">{errors.cardHolder}</small>
              )}
            </div>
            <div className="terms-acceptance">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <label htmlFor="acceptTerms">
                I accept the{" "}
                <span
                  className="underline-dotted"
                  onClick={() => setIsModalOpen(true)}
                >
                  Terms and Conditions
                </span>
              </label>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="modal-header">
                <h2>Terms and Conditions</h2>
              </div>
              <div className="modal-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum fermentum dolor ac lorem vehicula, eget sodales
                  urna scelerisque. Duis sed interdum neque.
                </p>
                <p>
                  Morbi dictum, erat et luctus tincidunt, tellus sem facilisis
                  dui, eu euismod neque lorem vitae nunc. Phasellus non euismod
                  arcu. Morbi in facilisis ex. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia curae; Sed
                  euismod sagittis elit, et facilisis justo iaculis non.
                </p>
                <p>
                  Ut quis neque at lacus pellentesque laoreet a et justo. Sed
                  sed erat quis quam tristique sollicitudin. Morbi dictum, metus
                  nec tristique cursus, neque turpis posuere ante, eu finibus
                  leo dui et odio.
                </p>
                <p>
                  Donec interdum justo quis diam elementum, ac tempus risus
                  interdum. Proin id varius felis, sit amet egestas dui. Sed ac
                  sapien est. Pellentesque habitant morbi tristique senectus et
                  netus et malesuada fames ac turpis egestas.
                </p>
              </div>
            </Modal>
          </div>
          <div className="right-column">
            <div className="input-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                maxLength={3}
              />
              <Tooltip content="Three numbers at the back of your card">
                <span className="cvv-icon">?</span>
              </Tooltip>
              {errors.cvv && <small className="error">{errors.cvv}</small>}
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting || !termsAccepted}>
          Submit (${total.toFixed(2)})
        </button>
      </form>
    </div>
  );
};

export default CreditCardForm;
