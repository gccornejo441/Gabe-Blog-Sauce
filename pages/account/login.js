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

const Login = () => (
  <div style={styles.content}>
    <div>
      <LoginForm />
    </div>
  </div>
)

export default Login
