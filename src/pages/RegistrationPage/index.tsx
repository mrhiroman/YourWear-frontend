import React from 'react'

import { Formik } from 'formik'

import styles from './RegistrationPage.module.sass'

import { Button, ButtonType } from 'components/ui/Button'
import { AuthButton, AuthButtonType } from './AuthButtons'
import { useGoogleLogin } from '@react-oauth/google'
import { LoginUserModel, OpenAPI, RegisterUserModel, UserInfoModel, UserService } from 'generated/api'
import { useAppDispatch } from 'redux/store'
import { setUser as setUserStore} from 'redux/user/slice'
import { useNavigate } from 'react-router-dom'

export const RegistrationPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const setToken = (token: string) => {
        OpenAPI.TOKEN = token
        localStorage.setItem("token", token)
    }

    const setUser = () => {
        UserService.getApiInfo().then(
            resp => {
                dispatch(setUserStore(resp as UserInfoModel))
            }
        )
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            UserService.postApiGoogleLogin(tokenResponse.access_token)
            .then(response => {
                setToken(response.accessToken as string)
                setUser()
                navigate("/profile")
            })
        },
    });

    const handleLogin = (model: LoginUserModel) => {
        UserService.postApiLogin(model)
        .then(response => {
            setToken(response.accessToken as string)
            setUser()
            navigate("/profile")
        })
    }

    const handleRegister = (model: RegisterUserModel) => {
        UserService.postApiRegister(model)
        .then(response => {
            setToken(response.accessToken as string)
            setUser()
            navigate("/profile")
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.auth_buttons}>
                <AuthButton type={AuthButtonType.Red} onClick={() => handleGoogleLogin()} text='sign in with google' />
            </div>
            <div className={styles.choicebar}>
                <div className={styles.line}></div>
                <span>OR</span>
                <div className={styles.line}></div>
            </div>
            <div className={styles.blocks}>
                <div className={styles.login}>
                    <div className={styles.title}>
                        <span className={styles.titleBig}>Login</span>
                        <span className={styles.titleSmall}>Log in to your account, to track your Goods and Make new Orders</span>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validate={values => {
                            const errors: Partial<typeof values> = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            } else if (values.password.length < 8) {
                                errors.password = 'Password is too short!';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            handleLogin({ email: values.email, password: values.password })
                        }}
                    >
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            errors,
                            touched
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className={styles.forms}>
                                    <label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            placeholder='Email'
                                        />
                                        <span className={styles.validate}>
                                            {errors.email && touched.email && errors.email}
                                        </span>
                                    </label>
                                    <label>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            placeholder='Password'
                                        />
                                        <span className={styles.validate}>
                                            {errors.password && touched.password && errors.password}
                                        </span>
                                    </label>
                                </div>
                                <p>Forgot Password?</p>
                                <div className={styles.buttons}>
                                    <Button type={ButtonType.Yellow} onClick={handleSubmit} text='Login' />
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className={styles.line}></div>
                <div className={styles.registration}>
                    <div className={styles.title}>
                        <span className={styles.titleBig}>Registration</span>
                        <span className={styles.titleSmall}>Register with us for a faster checkout, to track the status of your order and more</span>
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone: '',
                            password: ''
                        }}
                        validate={values => {
                            const errors: Partial<typeof values> = {};
                            if (!values.name) {
                                errors.name = 'Required';
                            } else if (values.name.length < 6) {
                                errors.name = 'Name is too short';
                            }
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.phone) {
                                errors.phone = 'Поле "Телефон" обязательно';
                            } else if (!/^\+7\d{10}$/.test(values.phone)) {
                                errors.phone = 'Неверный формат телефона';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            } else if (values.password.length < 8) {
                                errors.password = 'Invalid password';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            handleRegister({name: values.name, email: values.email, password: values.password})
                        }}
                    >
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            errors,
                            touched
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className={styles.forms}>
                                    <label>
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            placeholder='Name'
                                        />
                                        <span className={styles.validate}>
                                            {errors.name && touched.name && errors.name}
                                        </span>
                                    </label>
                                    <label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            placeholder='Email'
                                        />
                                        <span className={styles.validate}>
                                            {errors.email && touched.email && errors.email}
                                        </span>
                                    </label>
                                    <label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phone}
                                            placeholder='Phone'
                                        />
                                        <span className={styles.validate}>
                                            {errors.phone && touched.phone && errors.phone}
                                        </span>
                                    </label>
                                    <label>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            placeholder='Password'
                                        />
                                        <span className={styles.validate}>
                                            {errors.password && touched.password && errors.password}
                                        </span>
                                    </label>
                                </div>
                                <div className={styles.buttons}>
                                    <Button type={ButtonType.Blue} onClick={handleSubmit} text='Register' />
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
