import React from "react";
import { ContactInputField } from "./Contact/ContactInputField";

const token = "ab8104b8-6524-4d26-84cb-25cbbd343480";

export const Contact = () => {
  const refForm = React.createRef<HTMLFormElement>();

  const e = (t: any, e: HTMLFormElement | null) => {
    const n = [].slice.call(e?.querySelectorAll(t));
    if (0 === n.length) throw new Error(`GET_ELEMENTS: ${e?.id} -> ${t}`);
    return n;
  };

  const n = (t: any, e = document.body) => {
    const n = e.querySelector(t);
    if (!n) throw new Error(`GET_ELEMENT: ${e.id} -> ${t}`);
    return n;
  };

  const u = (t: any) => {
    const e: { [k: string]: any } = {};
    return (
      t.forEach(
        (i: {
          type: string;
          name: string;
          id: string;
          disabled: boolean;
          checked: boolean;
          value: any;
        }) => {
          if ("checkbox" === i.type || "radio" === i.type)
            return (
              e[i.name] || (e[i.name] = {}),
              void (e[i.name][i.id] = i.disabled
                ? "DISABLED"
                : i.checked.toString())
            );
          e[i.id] = i.value;
        }
      ),
      e
    );
  };

  function* onClick() {
    const E = e("input, textarea, select", refForm.current);
    const headers = new Headers({"Content-Type": "application/json"});
    const body = JSON.stringify({token, submissionObject: u(E)});

    yield fetch(`https://api.startbootstrap.com/api/latest/solution/forms`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body,
    }).then(response => console.log(response.json()));
  }

  return (
    <section className="page-section" id="contact">
      <div className="container">
        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
          Contact Me
        </h2>
        <div className="divider-custom">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-line"></div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <form
              ref={refForm}
              id="contactForm"
              data-sb-form-api-token="ab8104b8-6524-4d26-84cb-25cbbd343480"
            >
              <ContactInputField
                title="Full name"
                id="name"
                placeholder="Enter your name..."
              />
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  data-sb-validations="required,email"
                />
                <label htmlFor="email">Email address</label>
                <div
                  className="invalid-feedback"
                  data-sb-feedback="email:required"
                >
                  An email is required.
                </div>
                <div
                  className="invalid-feedback"
                  data-sb-feedback="email:email"
                >
                  Email is not valid.
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  data-sb-validations="required"
                />
                <label htmlFor="phone">Phone number</label>
                <div
                  className="invalid-feedback"
                  data-sb-feedback="phone:required"
                >
                  A phone number is required.
                </div>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="message"
                  // type="text"
                  placeholder="Enter your message here..."
                  style={{ height: "10rem" }}
                  data-sb-validations="required"
                ></textarea>
                <label htmlFor="message">Message</label>
                <div
                  className="invalid-feedback"
                  data-sb-feedback="message:required"
                >
                  A message is required.
                </div>
              </div>
              <div className="d-none" id="submitSuccessMessage">
                <div className="text-center mb-3">
                  <div className="fw-bolder">successfully Sent!</div>
                </div>
              </div>
              <div className="d-none" id="submitErrorMessage">
                <div className="text-center text-danger mb-3">
                  Error sending message!
                </div>
              </div>
              <button
                className="btn btn-primary btn-xl"
                id="submitButton"
                type="submit"
                onClick={onClick}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
