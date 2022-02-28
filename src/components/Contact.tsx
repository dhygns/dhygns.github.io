import React from "react";
import { Divider } from "./Divider";
import { ContactInputField } from "./Contact/ContactInputField";
import { Button, Container, Row, Col } from "react-bootstrap";

const token = "ab8104b8-6524-4d26-84cb-25cbbd343480";

export const Contact = () => {
  const refForm = React.createRef<HTMLFormElement>();
  const [result, setResult] = React.useState<boolean | undefined>();
  const [isNameReady, setIsNameReady] = React.useState(false);
  const [isEmailReady, setIsEmailReady] = React.useState(false);
  const [isPhoneReady, setIsPhoneReady] = React.useState(false);
  const [isMessageReady, setIsMessageReady] = React.useState(false);

  const e = (t: any, e: HTMLFormElement | null) => {
    const n = [].slice.call(e?.querySelectorAll(t));
    if (0 === n.length) throw new Error(`GET_ELEMENTS: ${e?.id} -> ${t}`);
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

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const E = e("input, textarea, select", refForm.current);
    const headers = new Headers({ "Content-Type": "application/json" });
    const body = JSON.stringify({ token, submissionObject: u(E) });
    fetch(`https://api.startbootstrap.com/api/latest/solution/forms`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body,
    }).then((resp) => {
      setResult(resp.ok);
    });
    event.preventDefault();
  };

  return (
    <section className="page-section" id="contact">
      <Container>
        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
          Contact Me
        </h2>
        <Divider />
        <Row className="justify-content-center">
          <Col lg="8" xl="7">
            <form ref={refForm} id="contactForm">
              <ContactInputField
                title="Full name"
                id="name"
                type="text"
                placeholder="Enter your name..."
                onReadyToSubmit={setIsNameReady}
              />
              <ContactInputField
                title="Email address"
                id="email"
                type="text"
                placeholder="name@example.com"
                onReadyToSubmit={setIsEmailReady}
              />
              <ContactInputField
                title="Phone number"
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                onReadyToSubmit={setIsPhoneReady}
              />
              <ContactInputField
                title="Message"
                id="message"
                type="textarea"
                style={{ height: "10rem" }}
                placeholder="Enter your message here..."
                onReadyToSubmit={setIsMessageReady}
              />

              <div className="d-block">
                <div className="text-center mb-3">
                  {result !== undefined &&
                    (result ? (
                      <div className="fw-bolder text-success">
                        Successfully Sent!
                      </div>
                    ) : (
                      <div className="fw-bolder text-danger">
                        Failed to send
                      </div>
                    ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                id="submitButton"
                type="submit"
                onClick={onClick}
                disabled={
                  !isNameReady ||
                  !isEmailReady ||
                  !isPhoneReady ||
                  !isMessageReady
                }
              >
                Send
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
