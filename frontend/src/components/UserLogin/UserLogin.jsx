import { React, useState } from "react";
import styles from "./userlogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import loginImage from "../../assets/kerala.jpg";

function UserLogin() {
  return (
    <div>
      <div className={styles.containerOneUser}>
        <div className={styles.containerSubUser}>
          <div className={styles.containerTwoLeft}>
            <div className={styles.leftMain}>
              <div className={styles.logoContainer}>
                <div className={styles.logo}>
                </div>
              </div>
              <div className={styles.contentsContainerLeft}>
                <div className={styles.contentsMainLeft}>
                  <div className={styles.headingMain}>
                    <h2>Welcome Back</h2>
                  </div>
                  <div className={styles.paraContent}>
                    <p>This is a demo content</p>
                  </div>
                  <div className={styles.formContainer}>
                    <form className="form" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="email1" className={styles.label}>
                          Your email
                        </label>
                        <input
                          id="email1"
                          name="email"
                          type="email"
                          placeholder="Email@example.com"
                          required
                          className={styles.input}
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="password1"
                          className={styles.label}
                          style={{ marginTop: "20px" }}
                        >
                          Your password
                        </label>
                        <input
                          id="password1"
                          name="password"
                          type="password"
                          required
                          className={styles.input}
                          placeholder="Enter Your Password"
                          value={form.password}
                          onChange={handleChange}
                        />
                      </div>

                      <div className={styles.forgotPassContainer}>
                        <Link className={styles.linkStyle}>Forgot Password?</Link>
                      </div>

                      <div className={styles.buttonContainer}>
                        <button type="submit">Login</button>
                      </div>
                    </form>
                  </div>

                  <div className={styles.seperator}>
                    <div className={styles.hr}></div>
                    <p>Or</p>
                    <div className={styles.hr}></div>
                  </div>
                  <div className={styles.signup}>
                    <p>Don't you have an account?</p>
                    <Link className={styles.linkStyle} to={'/phonesignup'}>Sign Up</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bgContainer}></div>
          </div>
          <div className={styles.containerTwoRight}>
            <div className={styles.rightMain}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
