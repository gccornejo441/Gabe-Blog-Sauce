import LoginForm from '@/components/portal/loginForm'
import React from 'react'
const styles = {
  content: {
    padding: `8px 32px`,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 16,
  },
}

const Logout = () => (
  <div style={styles.content}>
    <h3>Sign in</h3>
    <div style={styles.textContainer}>
      <p>
        This auth page is <b>static</b>. It will redirect on the client side if the user is already
        authenticated.
      </p>
    </div>
    <div>
      <LoginForm />
    </div>
  </div>
)

export default Logout
